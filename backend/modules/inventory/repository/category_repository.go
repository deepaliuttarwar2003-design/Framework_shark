package repository

import (
	"context"
	"time"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/model"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryRepository struct{
	collection *mongo.Collection
}

func NewCategoryRepository(db *mongo.Database) *CategoryRepository{
	return &CategoryRepository{
		collection: db.Collection("categories"),
	}
}

// READ ALL

func (r *CategoryRepository) FindAll() ([]model.Category,error){

	ctx, cancel := context.WithTimeout(context.Background(),10*time.Second)

	defer cancel()

	cursor , err := r.collection.Find(ctx,bson.M{})

	if err != nil{
		return nil,err
	}

	var results []model.Category

	err = cursor.All(ctx,&results)

	if err != nil {
		return nil, err
	}

	return results, nil
}

// CREATE
func (r *CategoryRepository) Save(entity model.Category) (model.Category, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	_, err := r.collection.InsertOne(ctx, entity)

	if err != nil {
		return model.Category{}, err
	}

	return entity, nil
}

// UPDATE
func (r *CategoryRepository) Update(id string, item model.Category) (model.Category, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return model.Category{}, err
	}

	_, err = r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objectID}, 
		bson.M{"$set": item},
	)

	if err != nil {
		return model.Category{}, err
	}

	return item, nil
}

// DELETE
func (r *CategoryRepository) Delete(id string,) error {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)

	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		ctx,
		bson.M{"_id": objectID},
	)

	return err
}


func (r *CategoryRepository) FindByName(
	name string,
) (model.Category, error) {

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)

	defer cancel()

	var category model.Category

	err := r.collection.FindOne(
		ctx,
		bson.M{
			"name": bson.M{
				"$regex": primitive.Regex{
					Pattern: "^" + name + "$",
					Options: "i",
				},
			},
		},
	).Decode(&category)

	return category, err
}