// package repository

// import (
// 	"context"
// 	"time"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// 	"go.mongodb.org/mongo-driver/mongo"
// )

// type Repository struct {
// 	collection *mongo.Collection
// }

// func NewRepository(collection *mongo.Collection) *Repository {
// 	return &Repository{
// 		collection: collection,
// 	}
// }

// func (r *Repository) Create(data model.Crm) (interface{}, error) {

// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	return r.collection.InsertOne(ctx, data)
// }

// func (r *Repository) GetAll() ([]model.Crm, error) {

// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	var crmList []model.Crm

// 	cursor, err := r.collection.Find(ctx, bson.M{})
// 	if err != nil {
// 		return nil, err
// 	}

// 	defer cursor.Close(ctx)

// 	for cursor.Next(ctx) {

// 		var crm model.Crm

// 		if err := cursor.Decode(&crm); err != nil {
// 			return nil, err
// 		}

// 		crmList = append(crmList, crm)
// 	}

// 	return crmList, nil
// }

// func (r *Repository) Update(id string, data interface{}) error {

// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	objID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return err
// 	}

// 	_, err = r.collection.UpdateOne(
// 		ctx,
// 		bson.M{"_id": objID},
// 		bson.M{"$set": data},
// 	)

// 	return err
// }

// func (r *Repository) Delete(id string) error {

// 	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
// 	defer cancel()

// 	objID, err := primitive.ObjectIDFromHex(id)
// 	if err != nil {
// 		return err
// 	}

// 	_, err = r.collection.DeleteOne(
// 		ctx,
// 		bson.M{"_id": objID},
// 	)

// 	return err
// }

package repository

import (
	"context"
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(collection *mongo.Collection) *Repository {
	return &Repository{
		collection: collection,
	}
}

func (r *Repository) Create(data model.Crm) (interface{}, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	return r.collection.InsertOne(ctx, data)
}

func (r *Repository) GetAll() ([]model.Crm, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var crmList []model.Crm

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	for cursor.Next(ctx) {

		var crm model.Crm

		if err := cursor.Decode(&crm); err != nil {
			return nil, err
		}

		crmList = append(crmList, crm)
	}

	return crmList, nil
}

func (r *Repository) Update(id string, data interface{}) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objID},
		bson.M{"$set": data},
	)

	return err
}

func (r *Repository) Delete(id string) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		ctx,
		bson.M{"_id": objID},
	)

	return err
}