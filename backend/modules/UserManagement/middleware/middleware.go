package middleware

import "github.com/gin-gonic/gin"

func UserManagementMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// example middleware logic
		c.Next()
	}
}