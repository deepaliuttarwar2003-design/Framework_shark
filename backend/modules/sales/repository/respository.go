package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/model"
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

func (r *Repository) Create(ctx context.Context, sales *model.Sales) error {

	_, err := r.collection.InsertOne(ctx, sales)

	return err
}

func (r *Repository) GetAll(ctx context.Context) ([]model.Sales, error) {

	cursor, err := r.collection.Find(ctx, map[string]interface{}{})

	if err != nil {
		return nil, err
	}

	var sales []model.Sales

	if err = cursor.All(ctx, &sales); err != nil {
		return nil, err
	}

	return sales, nil
}
