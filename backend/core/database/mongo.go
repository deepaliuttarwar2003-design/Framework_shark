package database

import (
	"context"
	"log"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect(cfg *config.Config) *mongo.Database {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.DBUri))
	if err != nil {
		log.Fatal("Mongo connection error:", err)
	}

	// Ping DB (VERY IMPORTANT)
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Mongo ping error:", err)
	}

	log.Println("MongoDB connected")

	return client.Database("sharkweb")
}
