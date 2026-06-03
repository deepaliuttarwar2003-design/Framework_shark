package sales

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/service"
)

type SalesModule struct {
	handler *handler.Handler
}

func NewModule() module.Module {
	return &SalesModule{}
}

func (m *SalesModule) Name() string {
	return "sales"
}

func (m *SalesModule) Init(ctx *module.ModuleContext) error {

	repo := repository.NewRepository(ctx.DB)

	service := service.NewService(repo)

	m.handler = handler.NewHandler(service)

	return nil
}

func (m *SalesModule) RegisterRoutes(r *gin.RouterGroup) {

	r.POST("/createSales", m.handler.Create)
	r.GET("/all", m.handler.GetAll)
	r.GET("/:id", m.handler.GetByID)
	r.PUT("/:id", m.handler.Update)
	r.DELETE("/:id", m.handler.Delete)
}
