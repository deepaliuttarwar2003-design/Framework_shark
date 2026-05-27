// package crm

// import (
// 	"github.com/gin-gonic/gin"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/handler"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"
// )

// type Module struct {
// 	handler *handler.Handler
// }

// func NewModule() *Module {
// 	return &Module{}
// }

// func (m *Module) Name() string {
// 	return "crm"
// }

// func (m *Module) Init(ctx *module.ModuleContext) error {

// 	collection := ctx.DB.Collection("crm")

// 	repo := repository.NewRepository(collection)

// 	service := service.NewService(repo)

// 	m.handler = handler.NewHandler(service)

// 	return nil
// }

// func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

// 	r.POST("/create", m.handler.Create)
// 	r.GET("/getall", m.handler.GetAll)
// 	r.PUT("/update/:id", m.handler.Update)
// 	r.DELETE("/delete/:id", m.handler.Delete)

// 	// r.GET("/getallComments", m.handler.GetComments)
//     // r.GET("/getallDescriptions", m.handler.GetDescriptions)
//     r.GET("/getallChecklists", m.handler.GetChecklists)
//     // r.GET("/getallReminders", m.handler.GetReminders)

// 	r.POST("/descriptions", m.handler.AddDetail)
// 	r.POST("/checklists", m.handler.AddChecklist)
// 	// r.POST("/reminders", m.handler.Addreminder)
// 	r.POST("/comments", m.handler.AddComment)

// }

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

	r.POST("/create", m.handler.Create)
	r.GET("/getall", m.handler.GetAll)
	r.PUT("/update/:id", m.handler.Update)
	r.DELETE("/delete/:id", m.handler.Delete)

	// Comment
	r.POST("/comments", m.handler.AddComment)
	r.GET("/getallComments", m.handler.GetAllComments)

	// Checklist
	r.POST("/checklists", m.handler.AddChecklist)
	r.GET("/getallChecklists", m.handler.GetAllChecklist)

	// Detail
	r.POST("/descriptions", m.handler.AddDetail)
	r.GET("/getallDescriptions", m.handler.GetAllDetails)

	// Reminder
	r.POST("/reminders", m.handler.AddReminder)
	r.GET("/getallReminders", m.handler.GetAllReminders)
}
