package module

import "github.com/gin-gonic/gin"

type Module interface {
	Name() string
	Init(ctx *ModuleContext) error
	RegisterRoutes(r *gin.RouterGroup)
}
