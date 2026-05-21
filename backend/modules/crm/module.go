package crm

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"
)

type Module struct {
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "crm"
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	collection := ctx.DB.Collection("crm")

	repo := repository.NewRepository(collection)

	service := service.NewService(repo)

	m.handler = handler.NewHandler(service)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	r.POST("/", m.handler.Create)

	r.GET("/", m.handler.GetAll)

	r.PUT("/:id", m.handler.Update)

	r.DELETE("/:id", m.handler.Delete)
}
