package middleware

import "github.com/gin-gonic/gin"

func ContractMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// example middleware logic
		c.Next()
	}
}