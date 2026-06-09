// package utils

// import (
// 	"github.com/gin-gonic/gin"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/handler"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/repository"
// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/service"
// )

// type Module struct {
// 	handler *handler.Handler
// 	service *service.PurchaseOrderService
// }

// func NewModule() *Module {
// 	return &Module{}
// }

// func (m *Module) Name() string {
// 	return "purchase-order"
// }

// func (m *Module) Init(ctx *module.ModuleContext) error {

// 	repo := repository.NewRepository(ctx.DB)

// 	m.service = service.NewPurchaseOrderService(repo)

// 	m.handler = handler.NewPurchaseOrderHandler(m.service)

// 	return nil
// }

// func RegisterModule(
// 	router *gin.RouterGroup,
// 	db *mongo.Database,
// ) {

// 	repo := repository.NewRepository(db)

// 	purchaseOrderService := service.NewPurchaseOrderService(repo)

// 	purchaseOrderHandler := handler.NewPurchaseOrderHandler(
// 		purchaseOrderService,
// 	)

// 	r := router.Group("/purchase-order")

// 	{
// 		r.POST("/purchase", purchaseOrderHandler.Create)

// 		r.GET("/list", purchaseOrderHandler.GetAll)
// 	}
// }

package utils

import (
	"github.com/gin-gonic/gin"
	// "go.mongodb.org/mongo-driver/mongo"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/service"
)

type Module struct {
	handler *handler.Handler
	service *service.PurchaseOrderService
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "purchase-order"
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	repo := repository.NewRepository(ctx.DB)

	m.service = service.NewPurchaseOrderService(repo)

	m.handler = handler.NewPurchaseOrderHandler(m.service)

	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	// r.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": ModuleName + " module working 🚀",
	// 	})
	// })

	// r.GET("/health", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"status": "ok",
	// 		"module": ModuleName,
	// 	})
	// })
	r.POST("/createpurchaseorder", m.handler.Create)
	r.GET("/getallpurchaseorders", m.handler.GetAll)

}

// func RegisterModule(
// 	router *gin.RouterGroup,
// 	db *mongo.Database,
// ) {

// 	repo := repository.NewRepository(db)

// 	purchaseOrderService := service.NewPurchaseOrderService(repo)

// 	purchaseOrderHandler := handler.NewPurchaseOrderHandler(
// 		purchaseOrderService,
// 	)

// 	r := router.Group("/purchase-order")

// 	{
// 		r.POST("/create", purchaseOrderHandler.Create)

// 		r.GET("/list", purchaseOrderHandler.GetAll)
// 	}
// }