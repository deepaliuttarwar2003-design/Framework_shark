package utils

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/service"
)

func RegisterModule(
	router *gin.RouterGroup,
	db *mongo.Database,
) {

	repo := repository.NewRepository(db)

	purchaseOrderService := service.NewPurchaseOrderService(repo)

	purchaseOrderHandler := handler.NewPurchaseOrderHandler(
		purchaseOrderService,
	)

	r := router.Group("/purchase-order")

	{
		r.POST("/create", purchaseOrderHandler.Create)

		r.GET("/list", purchaseOrderHandler.GetAll)
	}
}
