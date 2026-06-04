package invoice

import (
	"github.com/gin-gonic/gin"
)

func RegisterInvoiceRoutes(r *gin.RouterGroup) {

	group := r.Group("/invoice")

	// TODO: attach handlers
	_ = group
}