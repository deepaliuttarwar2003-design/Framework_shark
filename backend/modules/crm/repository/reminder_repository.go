package repository

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ReminderRepository struct {
	collection *mongo.Collection
}

func NewReminderRepository(db *mongo.Database) *ReminderRepository {
	return &ReminderRepository{
		collection: db.Collection("reminders"),
	}
}

func (r *ReminderRepository) AddReminder(data model.Reminder) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := r.collection.InsertOne(ctx, data)

	return err
}

func (r *ReminderRepository) GetAllReminders() ([]model.Reminder, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var reminders []model.Reminder

	cursor, err := r.collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		var reminder model.Reminder

		cursor.Decode(&reminder)

		reminders = append(reminders, reminder)
	}

	return reminders, nil
}
