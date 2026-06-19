package UserManagement

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "UserManagement"

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

	r.POST("/createUser",m.handler.Create)
	r.GET("/getAllUser",m.handler.GetAll)
	r.PUT("/updateUser/:id",m.handler.Update)
	r.DELETE("/deleteUser/:id",m.handler.Delete)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
