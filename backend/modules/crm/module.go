package crm

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)

type Module struct {
	checklistHandler *handler.ChecklistHandler
	commentHandler   *handler.CommentHandler
	detailHandler    *handler.DetailHandler
	reminderHandler  *handler.ReminderHandler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "crm"
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	db := ctx.DB

	// Checklist
	checklistRepo := repository.NewChecklistRepository(db)
	checklistService := service.NewChecklistService(checklistRepo)
	m.checklistHandler = handler.NewChecklistHandler(checklistService)

	// Comment
	commentRepo := repository.NewCommentRepository(db)
	commentService := service.NewCommentService(commentRepo)
	m.commentHandler = handler.NewCommentHandler(commentService)

	// Detail
	detailRepo := repository.NewDetailRepository(db)
	detailService := service.NewDetailService(detailRepo)
	m.detailHandler = handler.NewDetailHandler(detailService)

	// Reminder
	reminderRepo := repository.NewReminderRepository(db)
	reminderService := service.NewReminderService(reminderRepo)
	m.reminderHandler = handler.NewReminderHandler(reminderService)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	crm := r.Group("/crm")

	// Checklist
	crm.POST("/checklist", m.checklistHandler.AddChecklist)
	crm.GET("/checklist", m.checklistHandler.GetAllChecklist)

	// Comment
	crm.POST("/comment", m.commentHandler.AddComment)
	crm.GET("/comment", m.commentHandler.GetAllComments)

	// Detail
	crm.POST("/detail", m.detailHandler.AddDetail)
	crm.GET("/detail", m.detailHandler.GetDetail)

	// Reminder
	crm.POST("/reminder", m.reminderHandler.AddReminder)
	crm.GET("/reminder", m.reminderHandler.GetAllReminders)
}
