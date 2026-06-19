package repository

import (
	"context"
	"time"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("auth"),
	}
}

func (r *Repository) FindAll() []model.RegisterAuth {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil
	}

	var results []model.RegisterAuth
	err = cursor.All(ctx, &results)
	if err != nil {
		return nil
	}

	return results
}

func (r *Repository) FindByEmailOrUsername(identifier string) (model.RegisterAuth, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user model.RegisterAuth
	err := r.collection.FindOne(ctx, bson.M{
		"$or": []bson.M{
			{"email": primitive.Regex{Pattern: "^" + identifier + "$", Options: "i"}},
			{"username": primitive.Regex{Pattern: "^" + identifier + "$", Options: "i"}},
		},
	}).Decode(&user)
	if err != nil {
		return model.RegisterAuth{}, false
	}
	return user, true
}

func (r *Repository) Save(entity model.RegisterAuth) model.RegisterAuth {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, _ = r.collection.InsertOne(ctx, entity)
	return entity
}
