package service

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"
)

const DefaultTokenTTL = 24 * time.Hour

type TokenClaims struct {
    UserID    string `json:"userId"`
    Email     string `json:"email"`
    Username  string `json:"username,omitempty"`
    IssuedAt  int64  `json:"iat"`
    ExpiresAt int64  `json:"exp"`
}

type tokenHeader struct {
    Algorithm string `json:"alg"`
    Type      string `json:"typ"`
}

var (
    keyOnce    sync.Once
    privateKey *rsa.PrivateKey
    publicKey  *rsa.PublicKey
    keyLoadErr error
)

func IssueToken(userID, email, username string, ttl time.Duration) (string, time.Time, error) {
    if ttl <= 0 {
        ttl = DefaultTokenTTL
    }

    if err := loadKeys(); err != nil {
        return "", time.Time{}, err
    }

    now := time.Now().UTC()
    expiresAt := now.Add(ttl)
    claims := TokenClaims{
        UserID:    userID,
        Email:     email,
        Username:  username,
        IssuedAt:  now.Unix(),
        ExpiresAt: expiresAt.Unix(),
    }

    token, err := signToken(claims)
    if err != nil {
        return "", time.Time{}, err
    }

    return token, expiresAt, nil
}

func signToken(claims TokenClaims) (string, error) {
    header := tokenHeader{Algorithm: "RS256", Type: "JWT"}

    headerSegment, err := encodeSegment(header)
    if err != nil {
        return "", err
    }

    payloadSegment, err := encodeSegment(claims)
    if err != nil {
        return "", err
    }

    signingInput := headerSegment + "." + payloadSegment
    hash := sha256.Sum256([]byte(signingInput))
    signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hash[:])
    if err != nil {
        return "", err
    }

    return signingInput + "." + base64.RawURLEncoding.EncodeToString(signature), nil
}

func encodeSegment(value any) (string, error) {
    payload, err := json.Marshal(value)
    if err != nil {
        return "", err
    }

    return base64.RawURLEncoding.EncodeToString(payload), nil
}

func loadKeys() error {
    keyOnce.Do(func() {
        privateKey, keyLoadErr = loadPrivateKey()
        if keyLoadErr != nil {
            return
        }

        publicKey, keyLoadErr = loadPublicKey()
    })

    return keyLoadErr
}

func loadPrivateKey() (*rsa.PrivateKey, error) {
    path, err := resolveKeyPath("private.pem")
    if err != nil {
        return nil, err
    }

    content, err := os.ReadFile(path)
    if err != nil {
        return nil, err
    }

    block, _ := pem.Decode(content)
    if block == nil {
        return nil, errors.New("invalid private key pem")
    }

    if key, err := x509.ParsePKCS1PrivateKey(block.Bytes); err == nil {
        return key, nil
    }

    parsedKey, err := x509.ParsePKCS8PrivateKey(block.Bytes)
    if err != nil {
        return nil, err
    }

    key, ok := parsedKey.(*rsa.PrivateKey)
    if !ok {
        return nil, errors.New("private key is not rsa")
    }

    return key, nil
}

func loadPublicKey() (*rsa.PublicKey, error) {
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
