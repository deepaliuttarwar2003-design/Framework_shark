package middleware

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

const claimsContextKey = "auth.claims"

type TokenClaims struct {
	UserID    string `json:"userId"`
	Email     string `json:"email"`
	Username  string `json:"username,omitempty"`
	IssuedAt  int64  `json:"iat"`
	ExpiresAt int64  `json:"exp"`
}

var (
	keyOnce    sync.Once
	publicKey  *rsa.PublicKey
	keyLoadErr error
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authorizationHeader := c.GetHeader("Authorization")
		token := ""

		if authorizationHeader != "" {
			parts := strings.Fields(authorizationHeader)
			if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"error": "authorization header must use Bearer token",
				})
				return
			}

			token = parts[1]
		} else {
			cookieToken, err := c.Cookie("token")
			if err != nil || cookieToken == "" {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"error": "missing authorization header or auth cookie",
				})
				return
			}

			token = cookieToken
		}

		claims, err := verifyToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.Set(claimsContextKey, claims)
		c.Next()
	}
}

func ClaimsFromContext(c *gin.Context) (*TokenClaims, bool) {
	value, exists := c.Get(claimsContextKey)
	if !exists {
		return nil, false
	}

	claims, ok := value.(*TokenClaims)
	if !ok || claims == nil {
		return nil, false
	}

	return claims, true
}

func verifyToken(token string) (*TokenClaims, error) {
	if err := loadPublicKey(); err != nil {
		return nil, err
	}

	parts := strings.Split(strings.TrimSpace(token), ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	signingInput := parts[0] + "." + parts[1]
	signature, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, errors.New("invalid token signature")
	}

	hash := sha256.Sum256([]byte(signingInput))
	if err := rsa.VerifyPKCS1v15(publicKey, crypto.SHA256, hash[:], signature); err != nil {
		return nil, errors.New("invalid or tampered token")
	}

	payload, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, errors.New("invalid token payload")
	}

	var claims TokenClaims
	if err := json.Unmarshal(payload, &claims); err != nil {
		return nil, errors.New("invalid token claims")
	}

	if claims.ExpiresAt == 0 || time.Unix(claims.ExpiresAt, 0).UTC().Before(time.Now().UTC()) {
		return nil, errors.New("token expired")
	}

	if claims.UserID == "" || claims.Email == "" {
		return nil, errors.New("token missing required claims")
	}

	return &claims, nil
}

func loadPublicKey() error {
	keyOnce.Do(func() {
		publicKey, keyLoadErr = readPublicKey()
	})

	return keyLoadErr
}

func readPublicKey() (*rsa.PublicKey, error) {
	path, err := resolveKeyPath("public.pem")
	if err != nil {
		return nil, err
	}

	content, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(content)
	if block == nil {
		return nil, errors.New("invalid public key pem")
	}

	if key, err := x509.ParsePKCS1PublicKey(block.Bytes); err == nil {
		return key, nil
	}

	parsedKey, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	key, ok := parsedKey.(*rsa.PublicKey)
	if !ok {
		return nil, errors.New("public key is not rsa")
	}

	return key, nil
}

func resolveKeyPath(fileName string) (string, error) {
	candidates := []string{
		filepath.Join("core", "certs", fileName),
		filepath.Join("backend", "core", "certs", fileName),
		filepath.Join("..", "core", "certs", fileName),
		filepath.Join("..", "backend", "core", "certs", fileName),
	}

	for _, candidate := range candidates {
		if info, err := os.Stat(candidate); err == nil && !info.IsDir() {
			return candidate, nil
		}
	}

	return "", fmt.Errorf("rsa key %s not found", fileName)
}
