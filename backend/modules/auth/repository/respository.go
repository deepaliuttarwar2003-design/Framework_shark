package repository

import (
	"context"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) Register(user model.Auth) (interface{}, error) {

	collection := r.db.Collection("users")

	result, err := collection.InsertOne(
		context.Background(),
		user,
	)

	return result, err
}

func (r *Repository) FindByEmail(email string) (*model.Auth, error) {

	collection := r.db.Collection("users")

	var user model.Auth

	err := collection.FindOne(
		context.Background(),
		bson.M{"email": email},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
