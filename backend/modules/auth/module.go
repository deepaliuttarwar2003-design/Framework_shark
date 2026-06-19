package auth

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "auth"

type Module struct {
	service *service.Service
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	m.service = service.NewService(ctx.DB)
	m.handler = handler.NewHandler(m.service)
	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	// RegisterAuthRoutes(r, m.handler)
	r.POST("/register",m.handler.CreateRegister)
	r.POST("/login",m.handler.CreateLogin)
	r.DELETE("/logout/:id",m.handler.Logout)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
