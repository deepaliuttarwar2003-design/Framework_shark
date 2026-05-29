package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddComment(data model.Comment) error {

	collection := r.db.Collection("crm_comments")

	_, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}

func (r *Repository) GetAllComment() ([]model.Comment, error) {

	collection := r.db.Collection("crm_comments")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var comments []model.Comment

	err = cursor.All(context.Background(), &comments)

	return comments, err
}