package health

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/gin-gonic/gin"
)

type HealthModule struct{}

func NewModule() *HealthModule {
	return &HealthModule{}
}

func (m *HealthModule) Name() string {
	return "health"
}

func (m *HealthModule) Init(ctx *module.ModuleContext) error {
	return nil
}

func (m *HealthModule) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})
}
