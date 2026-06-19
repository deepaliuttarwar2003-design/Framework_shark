package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Minimal local replacement for auth.ValidateToken to avoid import issues.
type Claims struct {
	ID    string
	Email string
}

// ValidateToken validates the token string and returns claims or an error.
// This is a simple placeholder to avoid external import problems; replace
// with real validation when the workspace/module is set up correctly.
func ValidateToken(token string) (*Claims, error) {
	if token == "" {
		return nil, fmt.Errorf("empty token")
	}
	// For now, return dummy claims. In real use, parse and verify JWT here.
	return &Claims{ID: "6a2ba734536eb912a6e32a06", Email: "sahil111@gmail.com"}, nil
}

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		fmt.Println("===== AUTH MIDDLEWARE =====")

		tokenString := "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMmJhNzM0NTM2ZWI5MTJhNmUzMmEwNiIsIm5hbWUiOiIiLCJlbWFpbCI6InNhaGlsMTExQGdtYWlsLmNvbSIsImlzcyI6InNoYXJrd2ViIiwiZXhwIjoxNzgxMzM1NTQ5LCJpYXQiOjE3ODEyNDkxNDl9.dG--d7cUe1HBM4noRXAL2MKbFIf_sr1G3i3WdYZCXPiScm7MFxZZPllRV2224wp_4BdDqvzP8-FOdtx3HkI8LTaTw794-9XCt2nmvhUTvXr3uuoe6dMDkZJamc9ir_fb5fzHUkMnbyGfQFfiY7iY-QHThFFZyazAlzChH5VIZeoAP2frpa3ojlsIhVvWsZtvYDR84VLbFPUA7ZTdoXnrpt_rj4_ApYPxC6X2udzySmGoj5OyMCwjyHhrNeuu9LaJ4Doc1KtXuRYJV4vagchWfZDUeHm1NAet_TeySZ1hMYj6615eEwuPUAzIaKMS4f_Rj5eoPSIuQkmbS26M9Chb6A"

		fmt.Println("Token Received")
		fmt.Println(tokenString)

		claims, err := ValidateToken(tokenString)

		if err != nil {

			fmt.Println("TOKEN VALIDATION FAILED:", err)

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "invalid token",
			})

			c.Abort()
			return
		}

		fmt.Println("TOKEN VALIDATION SUCCESS")

		c.Set("userID", claims.ID)
		c.Set("email", claims.Email)

		c.Next()
	}
}
