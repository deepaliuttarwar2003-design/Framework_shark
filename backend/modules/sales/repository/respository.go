package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("sales"),
	}
}

// CREATE
func (r *Repository) Create(ctx context.Context, sales *model.Sales) error {
	_, err := r.collection.InsertOne(ctx, sales)
	return err
}

// GET ALL
func (r *Repository) GetAll(ctx context.Context) ([]model.Sales, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var sales []model.Sales

	if err = cursor.All(ctx, &sales); err != nil {
		return nil, err
	}

	return sales, nil
}

// GET BY ID
func (r *Repository) GetByID(ctx context.Context, id string) (*model.Sales, error) {
	var sales model.Sales

	err := r.collection.FindOne(
		ctx,
		bson.M{"id": id},
	).Decode(&sales)

	if err != nil {
		return nil, err
	}

	return &sales, nil
}

// UPDATE
func (r *Repository) Update(ctx context.Context, id string, sales *model.Sales) error {
	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{"id": id},
		bson.M{
			"$set": sales,
		},
	)

	return err
}

// DELETE
func (r *Repository) Delete(ctx context.Context, id string) error {
	_, err := r.collection.DeleteOne(
		ctx,
		bson.M{"id": id},
	)

	return err
}
