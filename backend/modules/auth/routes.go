package auth

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/handler"
	authmiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(r *gin.RouterGroup, h *handler.Handler) {
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": ModuleName + " module working 🚀",
		})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
			"module": ModuleName,
		})
	})

	r.POST("/register", h.CreateRegister)
	r.POST("/login", h.CreateLogin)

	protected := r.Group("")
	protected.Use(authmiddleware.AuthMiddleware())
	protected.GET("/me", h.Me)
	protected.POST("/logout", h.Logout)
}
