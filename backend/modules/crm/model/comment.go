package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Comment struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	CRMID string `bson:"crm_id" json:"crm_id"`

	Message string `bson:"message" json:"message"`

	Author string `bson:"author" json:"author"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
