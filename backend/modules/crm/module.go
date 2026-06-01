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

	repo := repository.NewRepository(ctx.DB)

	services := service.NewService(repo)

	m.handler = handler.NewHandler(services)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	// CRM
	r.POST("/", m.handler.Create)
	r.GET("/", m.handler.GetAll)

	// Checklist
	r.POST("/checklist", m.handler.AddChecklist)
	r.GET("/checklist", m.handler.GetAllChecklist)

	// Comment
	r.POST("/comment", m.handler.AddComment)
	r.GET("/comment", m.handler.GetAllComment)

	// Detail
	r.POST("/detail", m.handler.AddDetail)
	r.GET("/detail", m.handler.GetAllDetails)

	// Reminder
	r.POST("/reminder", m.handler.AddReminder)
	r.GET("/reminder", m.handler.GetAllReminder)

	r.PUT("/:id", m.handler.Update)
	r.DELETE("/:id", m.handler.Delete)
}
