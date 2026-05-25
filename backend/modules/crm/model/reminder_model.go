package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Reminder struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	CRMID string `bson:"crm_id" json:"crm_id"`

	ReminderTitle string `bson:"reminder_title" json:"reminder_title"`

	ReminderDate string `bson:"reminder_date" json:"reminder_date"`

	ReminderTime string `bson:"reminder_time" json:"reminder_time"`
}
