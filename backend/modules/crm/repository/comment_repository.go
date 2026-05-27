// package repository

// import (
// 	"context"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
// )

// func (r *Repository) AddComment(data model.Comment) error {

// 	_, err := r.collection.InsertOne(context.Background(), data)

// 	return err
// }

package repository

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) AddComment(data model.Comment) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := r.collection.InsertOne(ctx, data)

	return err
}

func (r *Repository) GetAllComments() ([]model.Comment, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var comments []model.Comment

	cursor, err := r.collection.Find(ctx, bson.M{})

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		var comment model.Comment

		cursor.Decode(&comment)

		comments = append(comments, comment)
	}

	return comments, nil
}
