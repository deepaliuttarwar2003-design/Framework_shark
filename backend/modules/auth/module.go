package auth

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

const ModuleName = "auth"

type Module struct {
	handler *authHandler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	// Initialize Service
	authService := service.NewService(ctx.DB)

	// Initialize Handler
	m.handler = authHandler.NewHandler(authService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	h := m.handler

	// Public Routes
	r.POST("/register", h.Register)
	r.POST("/login", h.Loginuser)

	r.GET("/profile", middleware.AuthMiddleware(), h.GetProfile)
	r.POST("/logout", h.Logout)

	r.POST("/debug", h.DebugBody)

	r.POST("/logout", h.Logout)

	// Health Check
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "auth module working 🚀",
		})
	})
}

// Compile-time safety check
var _ module.Module = (*Module)(nil)
