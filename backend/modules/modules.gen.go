package modules

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	purchase_order "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order"
)

func RegisterModules(
	api *gin.RouterGroup,
	db *mongo.Database,
) {

	// Purchase Order Module
	purchase_order.RegisterModule(api, db)
}
