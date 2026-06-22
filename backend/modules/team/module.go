package team

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	teamHandler "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/team/handler"
	teamRepo "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/team/repository"
	teamService "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/team/service"
)

const ModuleName = "team"

type Module struct {
	handler *teamHandler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	repo := teamRepo.NewRepository(ctx.DB)
	service := teamService.NewService(repo)
	m.handler = teamHandler.NewHandler(service)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	teamGroup := r.Group("/teams")

	teamGroup.GET("/getteam", m.handler.GetAll)
	teamGroup.POST("/createteam", m.handler.Create)
	teamGroup.GET("/getbyidteam/:id", m.handler.GetByID)
	teamGroup.PUT("/updateteam/:id", m.handler.Update)
	teamGroup.DELETE("/deleteteam/:id", m.handler.Delete)
}

var _ module.Module = (*Module)(nil)