package repository

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{db: db}
}

// Example collection
func (r *Repository) collection() *mongo.Collection {
	return r.db.Collection("teams")
}

func (r *Repository) Create(ctx context.Context, data interface{}) error {
	_, err := r.collection().InsertOne(ctx, data)
	return err
}

func (r *Repository) GetAll(ctx context.Context) ([]bson.M, error) {
	cur, err := r.collection().Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var results []bson.M
	err = cur.All(ctx, &results)
	return results, err
}

func (r *Repository) GetByID(ctx context.Context, id string) (bson.M, error) {
	objID, _ := primitive.ObjectIDFromHex(id)

	var result bson.M
	err := r.collection().FindOne(ctx, bson.M{"_id": objID}).Decode(&result)
	return result, err
}

func (r *Repository) Update(ctx context.Context, id string, update interface{}) error {
	objID, _ := primitive.ObjectIDFromHex(id)

	_, err := r.collection().UpdateOne(
		ctx,
		bson.M{"_id": objID},
		bson.M{"$set": update},
	)
	return err
}

func (r *Repository) Delete(ctx context.Context, id string) error {
	objID, _ := primitive.ObjectIDFromHex(id)

	_, err := r.collection().DeleteOne(ctx, bson.M{"_id": objID})
	return err
}
