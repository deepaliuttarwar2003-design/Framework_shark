package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type DetailRepository struct {
	collection *mongo.Collection
}

func NewDetailRepository(db *mongo.Database) *DetailRepository {
	return &DetailRepository{
		collection: db.Collection("details"),
	}
}
func (r *DetailRepository) GetDetail() ([]model.Detail, error) {

	cursor, err := r.collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var details []model.Detail

	err = cursor.All(context.Background(), &details)

	return details, err
}

func (r *DetailRepository) AddDetail(data model.Detail) error {

	_, err := r.collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}
