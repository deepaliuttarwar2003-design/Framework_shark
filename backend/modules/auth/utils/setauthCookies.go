package auth

import "github.com/gin-gonic/gin"

func SetAuthCookie(c *gin.Context, token string) {
	c.SetCookie(
		"access_token",
		token,
		86400,
		"/",
		"",
		false,
		true,
	)
}
