package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/model"

	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {

	return &Repository{
		collection: db.Collection("purchase_orders"),
	}
}

func (r *Repository) Create(po *model.PurchaseOrder) error {

	_, err := r.collection.InsertOne(
		context.Background(),
		po,
	)

	return err
}

func (r *Repository) GetAll() ([]model.PurchaseOrder, error) {

	var orders []model.PurchaseOrder

	cursor, err := r.collection.Find(
		context.Background(),
		map[string]interface{}{},
	)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {

		var order model.PurchaseOrder

		cursor.Decode(&order)

		orders = append(orders, order)
	}

	return orders, nil
}

func (r *Repository) GetByID(id string) (*model.PurchaseOrder, error) {

	var order model.PurchaseOrder

	err := r.collection.FindOne(
		context.Background(),
		map[string]interface{}{
			"id": id,
		},
	).Decode(&order)

	if err != nil {
		return nil, err
	}
	return &order, nil
}

func (r *Repository) Update(id string, po *model.PurchaseOrder) error {

	_, err := r.collection.UpdateOne(
		context.Background(),
		map[string]interface{}{
			"id": id,
		},
		map[string]interface{}{
			"$set": po,
		},
	)

	return err
}

func (r *Repository) Delete(id string) error {

	_, err := r.collection.DeleteOne(
		context.Background(),
		map[string]interface{}{
			"id": id,
		},
	)

	return err
}