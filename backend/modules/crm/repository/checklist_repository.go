package repository

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddChecklist(data model.Checklist) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := r.collection.InsertOne(ctx, data)

	return err
}

func (r *Repository) GetAllChecklist() ([]model.Checklist, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var checklist []model.Checklist

	cursor, err := r.collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		var item model.Checklist

		cursor.Decode(&item)

		checklist = append(checklist, item)
	}

	return checklist, nil
}
