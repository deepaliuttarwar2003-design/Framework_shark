// package repository

// import (
// 	"context"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
// )

// func (r *Repository) AddDetail(data model.Detail) error {

// 	_, err := r.collection.InsertOne(context.Background(), data)

// 	return err
// }

package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) GetDetail() ([]model.Detail, error) {

	cursor, err := r.collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var details []model.Detail

	err = cursor.All(context.Background(), &details)

	return details, err
}

func (r *Repository) AddDetail(data model.Detail) error {

	_, err := r.collection.InsertOne(
		context.Background(),
		data,
	)

	return err
}