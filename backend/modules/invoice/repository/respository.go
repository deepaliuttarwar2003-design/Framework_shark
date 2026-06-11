package repository

import (
	"context"
	"time"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"


)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("invoice"),

	}
}

func (r *Repository) FindAll() ([]model.Invoice, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	cursor, err := r.collection.Find(
		ctx,
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var invoices []model.Invoice

	err = cursor.All(ctx, &invoices)
	if err != nil {
		return nil, err
	}

	return invoices, nil
}

func (r *Repository) Create(
	entity model.Invoice,
) (model.Invoice, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	_, err := r.collection.InsertOne(
		ctx,
		entity,
	)

	if err != nil {
		return model.Invoice{}, err
	}

	return entity, nil
}

func (r *Repository) Update(
	id string,
	item model.Invoice,
) (model.Invoice, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return model.Invoice{}, err
	}

	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objID},
		bson.M{"$set": item},
	)

	if err != nil {
		return model.Invoice{}, err
	}

	if result.MatchedCount == 0 {
		return model.Invoice{}, mongo.ErrNoDocuments
	}

	return item, nil
}

// delete

func (r *Repository) Delete(
	id string,
) error {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	result, err := r.collection.DeleteOne(
		ctx,
		bson.M{"_id": objID},
	)

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}

	return nil
}

// func (r *Repository) Save(entity model.Invoice) model.Invoice {
// 	r.db = append(r.db, entity)
// 	return entity
// }

