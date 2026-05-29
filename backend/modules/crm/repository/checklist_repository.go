package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddChecklist(data model.Checklist) error {

	collection := r.db.Collection("crm_checklists")

	_, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}

func (r *Repository) GetAllChecklist() ([]model.Checklist, error) {

	collection := r.db.Collection("crm_checklists")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var checklist []model.Checklist

	err = cursor.All(context.Background(), &checklist)

	return checklist, err
}
