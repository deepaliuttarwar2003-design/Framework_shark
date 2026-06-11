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

	
	r.POST("/createestimate",m.handler.Create)
	r.GET("/getallestimate",m.handler.GetAll)
	r.PUT("/updateestimate/:id",m.handler.Update)
	r.DELETE("/deleteestimate/:id",m.handler.Delete)
}


var _ module.Module = (*Module)(nil)