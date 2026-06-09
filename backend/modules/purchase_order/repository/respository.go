package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
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

    result, err := r.collection.InsertOne(
        context.Background(),
        po,
    )

    if err != nil {
        return err
    }

    po.ID = result.InsertedID.(primitive.ObjectID)

    return nil
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

		if err := cursor.Decode(&order); err != nil {
			return nil, err
		}

		orders = append(orders, order)
	}

	return orders, nil
}

// Get Purchase Order By ID
func (r *Repository) GetByID(id string) (*model.PurchaseOrder, error) {

	var order model.PurchaseOrder

	err := r.collection.FindOne(
		context.Background(),
		bson.M{"_id": objID},
	).Decode(&order)

	if err != nil {
		return nil, err
	}
	return &order, nil
}

// Update Purchase Order
func (r *Repository) Update(id string, po *model.PurchaseOrder) error {

	_, err := r.collection.UpdateOne(
		context.Background(),
		bson.M{"_id": objID},
		bson.M{"$set": po},
	)

	return err
}

// Delete Purchase Order
func (r *Repository) Delete(id string) error {

	_, err := r.collection.DeleteOne(
		context.Background(),
		bson.M{"_id": objID},
	)

	return err
}