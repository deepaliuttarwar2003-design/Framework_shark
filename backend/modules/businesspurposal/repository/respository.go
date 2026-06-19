package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/businesspurposal/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("proposals"),
	}
}

func( r *Repository) Create(proposal *model.Proposal) error {
	_, err := r.collection.InsertOne(context.Background(), proposal)
	return err
}

func (r *Repository) GetAll() ([]model.Proposal, error) {

	cursor, err := r.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var proposals []model.Proposal
	for cursor.Next(context.Background()) {
		var proposal model.Proposal
		if err := cursor.Decode(&proposal); err != nil {
			return nil, err
		}
		proposals = append(proposals, proposal)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return proposals, nil
}

func (r *Repository) GetByID(id string) (*model.Proposal, error) {

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var proposal model.Proposal

	err = r.collection.FindOne(
		context.Background(),
		bson.M{"_id": objID},
	).Decode(&proposal)

	if err != nil {
		return nil, err
	}

	return &proposal, nil
}

func (r *Repository) Update(id string, proposal *model.Proposal) error {

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.ReplaceOne(
		context.Background(),
		bson.M{"_id": objID},
		proposal,
	)

	return err
}

func (r *Repository) Delete(id string) error {

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		context.Background(),
		bson.M{"_id": objID},
	)

	return err
}
