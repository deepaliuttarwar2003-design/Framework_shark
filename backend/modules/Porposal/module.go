package Porposal

import (
	"github.com/gin-gonic/gin"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
)

const ModuleName = "Porposal"

type Module struct{}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
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
}

// compile-time safety
var _ module.Module = (*Module)(nil)