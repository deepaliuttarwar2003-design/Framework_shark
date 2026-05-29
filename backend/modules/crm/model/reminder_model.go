package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Reminder struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	CRMID string `bson:"crm_id" json:"crm_id"`

	Title string `bson:"title" json:"title"`

	Date string `bson:"date" json:"date"`

	Time string `bson:"time" json:"time"`
}
