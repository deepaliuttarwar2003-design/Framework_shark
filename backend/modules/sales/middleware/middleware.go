package middleware

import "github.com/gin-gonic/gin"

func SalesMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// example middleware logic
		c.Next()
	}
}