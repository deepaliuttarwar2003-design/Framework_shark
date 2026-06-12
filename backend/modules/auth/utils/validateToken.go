package auth

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func ValidateToken(tokenString string) (*Claims, error) {

	fmt.Println("===== VALIDATE TOKEN =====")
	fmt.Println("Token:", tokenString)

	publicKeyBytes, err := os.ReadFile("core/certs/public.pem")
	if err != nil {
		fmt.Println("PUBLIC KEY ERROR:", err)
		return nil, err
	}

	fmt.Println("Public Key Loaded Successfully")

	publicKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKeyBytes)
	if err != nil {
		fmt.Println("PUBLIC KEY PARSE ERROR:", err)
		return nil, err
	}

	token, err := jwt.ParseWithClaims(
		tokenString,
		&Claims{},
		func(token *jwt.Token) (interface{}, error) {
			return publicKey, nil
		},
	)

	if err != nil {
		fmt.Println("TOKEN PARSE ERROR:", err)
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		fmt.Println("INVALID CLAIMS")
		return nil, jwt.ErrTokenInvalidClaims
	}

	fmt.Println("TOKEN VALIDATED")
	fmt.Println("User ID:", claims.ID)
	fmt.Println("Email:", claims.Email)

	return claims, nil
}
