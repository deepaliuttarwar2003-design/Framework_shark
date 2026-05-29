package crm

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)


func (m *Module) Name() string {
	return ModuleName
}
const ModuleName = "crm"

type Module struct {
	service *service.Service
	handler *handler.Handler	
	checklistService *service.ChecklistService
	checklistHandler *handler.ChecklistHandler
	commentService   *service.CommentService
	commentHandler   *handler.CommentHandler
	detailHandler    *handler.DetailHandler
	detailService    *service.DetailService
	reminderHandler  *handler.ReminderHandler
	reminderService  *service.ReminderService
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	db := ctx.DB

	// Checklist
	checklistRepo := repository.NewChecklistRepository(db)
	checklistService := service.NewChecklistService(checklistRepo)
	m.checklistHandler = handler.NewChecklistHandler(checklistService)

	// Comment
	// commentRepo := repository.NewCommentRepository(db)
	commentService := service.NewCommentService(db)
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

	r.POST("/create", m.handler.Create)
	r.GET("/getall", m.handler.GetAll)
	r.PUT("/update/:id", m.handler.Update)
	r.DELETE("/delete/:id", m.handler.Delete)

	// Comment
	r.POST("/comments", m.commentHandler.AddComment)
	r.GET("/getallComments", m.commentHandler.GetAllComments)

	// Checklist
	r.POST("/checklists", m.checklistHandler.AddChecklist)
	r.GET("/getallChecklists", m.checklistHandler.GetAllChecklist)

	// Detail
	r.POST("/descriptions", m.detailHandler.AddDetail)
	r.GET("/getallDescriptions", m.detailHandler.GetAllDetails)

	// Reminder
	r.POST("/reminders", m.reminderHandler.AddReminder)
	r.GET("/getallReminders", m.reminderHandler.GetAllReminders)
}
