package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddReminder(data model.Reminder) error {

	collection := r.db.Collection("crm_reminders")

	_, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}

func (r *Repository) GetAllReminder() ([]model.Reminder, error) {

	collection := r.db.Collection("crm_reminders")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var reminders []model.Reminder

	err = cursor.All(context.Background(), &reminders)

	return reminders, err
}
