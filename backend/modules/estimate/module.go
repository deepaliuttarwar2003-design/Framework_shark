package estimate

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "estimate"

type Module struct{
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

	r.POST("/create",m.handler.Create)
	r.GET("/get",m.handler.GetAll)
	r.PUT("/update/:id",m.handler.Update)
	r.DELETE("/delete/:id",m.handler.Delete)
}

// compile-time safety
var _ module.Module = (*Module)(nil)