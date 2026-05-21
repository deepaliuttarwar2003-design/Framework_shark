package main

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/database"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	modules "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules"

	"github.com/gin-gonic/gin"
)

func main() {

	cfg := config.Load()

	db := database.Connect(cfg)

	bus := events.New()

	ctx := &module.ModuleContext{
		DB:       db,
		Config:   cfg,
		EventBus: bus,
	}

	r := gin.Default()

	r.Use(
		middleware.Recovery(),
		middleware.Logger(),
		middleware.CORS(),
		middleware.SecurityHeaders(),
		// middleware.RateLimit(),
	)

	loader := module.NewLoader()

	for _, m := range modules.LoadModules() {
		loader.Register(m)
	}

	loader.InitAll(ctx)

	loader.SetupRoutes(r)

	r.Run(":8080")
}