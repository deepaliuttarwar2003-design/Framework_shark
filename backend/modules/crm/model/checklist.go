package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Checklist struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	CRMID string `bson:"crm_id" json:"crm_id"`

	Title     string `bson:"title" json:"title"`
	IsChecked bool   `bson:"is_checked" json:"is_checked"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
