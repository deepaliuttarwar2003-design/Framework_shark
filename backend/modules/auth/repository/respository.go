package repository

import (
	"context"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		db: db,
	}
}

// ================= REGISTER =================

func (r *Repository) Register(user model.Auth) (interface{}, error) {

	collection := r.db.Collection("users")

	result, err := collection.InsertOne(
		context.Background(),
		user,
	)

	if err != nil {
		return nil, err
	}

	user.ID = result.InsertedID.(primitive.ObjectID)

	return user, nil
}

// ================= FIND BY EMAIL =================

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

// ================= FIND BY ID =================

func (r *Repository) FindByID(id string) (*model.Auth, error) {

	collection := r.db.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var user model.Auth

	err = collection.FindOne(
		context.Background(),
		bson.M{"_id": objectID},
	).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func CreateEmailIndex(db *mongo.Database) error {

	collection := db.Collection("users")

	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{Key: "email", Value: 1},
		},
		Options: options.Index().SetUnique(true),
	}

	_, err := collection.Indexes().CreateOne(
		context.Background(),
		indexModel,
	)

	return err
}