package modules

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	crm "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm"
)

func LoadModules() []module.Module {
	return []module.Module{
		crm.NewModule(),
	}
}

func RegisterModules(r *gin.Engine, ctx *module.ModuleContext) {

	api := r.Group("/api")

	for _, m := range LoadModules() {

		log.Println("🔌 Loading module: - modules.gen.go:24", m.Name())

		if err := m.Init(ctx); err != nil {
			log.Fatalf("❌ Failed to init module %s: %v", m.Name(), err)
		}

		group := api.Group("/" + m.Name())

		m.RegisterRoutes(group)
	}
}
