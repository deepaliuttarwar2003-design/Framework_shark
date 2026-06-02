package Project_Management

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/service"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/handler"
	"github.com/gin-gonic/gin"
)

const ModuleName = "Project_Management"

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

	
    println("=== PROJECT MANAGEMENT CRUD REGISTERED ===")

	r.POST("/createProject",m.handler.Create)
	r.GET("/getProject",m.handler.GetAll)
	r.PUT("/updateProject/:id",m.handler.Update)
	r.DELETE("/deleteProject/:id",m.handler.Delete)
}

// compile-time safety
var _ module.Module = (*Module)(nil)