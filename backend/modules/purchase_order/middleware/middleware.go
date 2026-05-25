package moddleware

import "github.com/gin-gonic/gin"

func PurchaseMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// example middleware logic
		c.Next()
	}
}
