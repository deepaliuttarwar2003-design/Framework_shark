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
	r.POST("/create", m.handler.Create)
	r.GET("/getall", m.handler.GetAll)

	// Checklist
	r.POST("/checklists", m.handler.AddChecklist)
	r.GET("/getallChecklists", m.handler.GetAllChecklist)

	// Comment
	r.POST("/comments", m.handler.AddComment)
	r.GET("/getallComments", m.handler.GetAllComment)

	// Detail
	r.POST("/descriptions", m.handler.AddDetail)
	r.GET("/getallDescriptions", m.handler.GetAllDetails)

	// Reminder
	r.POST("/reminders", m.handler.AddReminder)
	r.GET("/getallReminders", m.handler.GetAllReminder)
}
