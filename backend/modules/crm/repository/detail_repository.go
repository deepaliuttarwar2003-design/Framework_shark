package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddDetail(data model.Detail) error {

	collection := r.db.Collection("crm_details")

	_, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}

func (r *Repository) GetAllDetail() ([]model.Detail, error) {

	collection := r.db.Collection("crm_details")

	cursor, err := collection.Find(
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
