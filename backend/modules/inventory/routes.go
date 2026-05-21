package inventory

import (
	"github.com/gin-gonic/gin"
)

func RegisterInventoryRoutes(r *gin.RouterGroup) {

	group := r.Group("/inventory")

	// TODO: attach handlers
	_ = group
}