package dto

import "go.mongodb.org/mongo-driver/bson/primitive"

type RegisterDTO struct {
	id	   primitive.ObjectID `bson:"_id,omitempty"`
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginDTO struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
