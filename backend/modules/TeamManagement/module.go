package TeamManagement

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/service"
)

type Module struct {
	DB      *mongo.Database
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "teammanagement"
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	m.DB = ctx.DB

	repo := repository.NewRepository(ctx.DB)
	svc := service.NewService(repo)

	m.handler = handler.NewHandler(svc)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {
	team := r.Group("/team")

	team.GET("/getteams", m.handler.GetAll)
	team.POST("/createteam", m.handler.Create)

	// team.GET("/getteam/:id", m.handler.GetByID)
	// team.PUT("/updateteam/:id", m.handler.Update)
	// team.DELETE("/deleteteam/:id", m.handler.Delete)
}
