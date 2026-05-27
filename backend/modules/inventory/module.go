package inventory

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "inventory"

type Module struct{
	service *service.Service
	handler *handler.Handler

	categoryService *service.CategoryService
	categoryHandler *handler.CategoryHandler
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

	m.categoryService = service.NewCategoryService(ctx.DB)
	m.categoryHandler = handler.NewCategoryHandler(m.categoryService)

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
	r.GET("/getAllData",m.handler.GetAll)
	r.PUT("/update/:id",m.handler.Update)
	r.DELETE("/delete/:id",m.handler.Delete)

	categoryGroup := r.Group("/category")
	categoryGroup.POST("/createCategory",m.categoryHandler.CreateCategory)
	categoryGroup.GET("/getAllCategory",m.categoryHandler.GetAllCategory)
	categoryGroup.PUT("/updateCategory/:id",m.categoryHandler.UpdateCategory)
	categoryGroup.DELETE("/deleteCategory/:id",m.categoryHandler.DeleteCategory)

}

// compile-time safety
var _ module.Module = (*Module)(nil)