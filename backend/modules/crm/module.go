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

	db := ctx.DB

	repo := repository.NewRepository(db.Collection("crm"))

	svc := service.NewService(repo)

	m.handler = handler.NewHandler(svc)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	r.GET("/", m.handler.GetAll)
	r.POST("/", m.handler.Create)
	r.PUT("/:id", m.handler.Update)
	r.DELETE("/:id", m.handler.Delete)

	// Comment
	r.POST("/comment", m.handler.AddComment)

	// Checklist
	r.POST("/checklist", m.handler.AddChecklist)
	r.GET("/checklist", m.handler.GetAllChecklist)

	// Detail
	r.POST("/detail", m.handler.AddDetail)
	r.GET("/detail", m.handler.GetAllDetails)

	// Reminder
	r.POST("/reminder", m.handler.AddReminder)
	r.GET("/reminder", m.handler.GetAllReminders)
}
