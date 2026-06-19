package repository

import (
	"context"
	"time"

	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/model"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("userManagement"),
	}
}

func (r *Repository) FindAll() ([]model.UserManagement, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var results []model.UserManagement
	err = cursor.All(ctx, &results)

	if err != nil {
		return nil, err
	}

	return results, nil
}

// func (r *Repository) Save(entity model.UserManagement) model.UserManagement {
// 	r.db = append(r.db, entity)
// 	return entity
// }

func (r *Repository) Create(entity model.UserManagement) (model.UserManagement, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := r.collection.InsertOne(ctx, entity)
	if err != nil {
		return model.UserManagement{}, err
	}

	return entity, nil
}

func (r *Repository) Update(id string, item model.UserManagement) (model.UserManagement, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return model.UserManagement{}, err
	}

	_, err = r.collection.UpdateOne(ctx,
		bson.M{"_id": objID},
		bson.M{"$set": item},
	)

	return item, err
}

func (r *Repository) Delete(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(ctx,
		bson.M{
			"_id": objID},
	)
	return err
}
