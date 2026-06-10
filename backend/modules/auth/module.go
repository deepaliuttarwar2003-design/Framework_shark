package auth

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	authHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

const ModuleName = "auth"

type Module struct {
	repo    *repository.Repository
	handler *authHandler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	m.repo = repository.NewRepository(ctx.DB)
	// service.NewService expects *mongo.Database, pass ctx.DB (not the repository)
	m.handler = authHandler.NewHandler(service.NewService(ctx.DB))

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	h := m.handler

	r.POST("/register", h.Register)
	r.POST("/login", h.Login)

}

// compile-time safety
var _ module.Module = (*Module)(nil)
