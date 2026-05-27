package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Detail struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	CRMID string `bson:"crm_id" json:"crm_id"`

	Description string `bson:"description" json:"description"`
	Status      string `bson:"status" json:"status"`
	Priority    string `bson:"priority" json:"priority"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
