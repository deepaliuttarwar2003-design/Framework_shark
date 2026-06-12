package auth

import "go.mongodb.org/mongo-driver/bson/primitive"

type Auth struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name     string             `json:"name"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}
