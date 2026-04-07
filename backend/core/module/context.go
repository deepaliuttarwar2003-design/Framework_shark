package module

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
	"go.mongodb.org/mongo-driver/mongo"
)

type ModuleContext struct {
	DB       *mongo.Database
	Config   *config.Config
	EventBus *events.EventBus
}
