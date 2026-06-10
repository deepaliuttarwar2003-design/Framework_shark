package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/model"

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

// CREATE
func (r *Repository) Create(proposal *model.Proposal) error {

	_, err := r.collection.InsertOne(
		context.Background(),
		proposal,
	)

	return err
}

// GET ALL
func (r *Repository) GetAll() ([]model.Proposal, error) {

	cursor, err := r.collection.Find(
		context.Background(),
		bson.M{},
	)
	if err != nil {
		return nil, err
	}

	var proposals []model.Proposal

	err = cursor.All(
		context.Background(),
		&proposals,
	)

	return proposals, err
}

// GET BY ID
func (r *Repository) GetByID(id string) (*model.Proposal, error) {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var proposal model.Proposal

	err = r.collection.FindOne(
		context.Background(),
		bson.M{"_id": objectID},
	).Decode(&proposal)

	if err != nil {
		return nil, err
	}

	return &proposal, nil
}

// UPDATE
func (r *Repository) Update(id string, proposal *model.Proposal) error {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.ReplaceOne(
		context.Background(),
		bson.M{"_id": objectID},
		proposal,
	)

	return err
}

// DELETE
func (r *Repository) Delete(id string) error {

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(
		context.Background(),
		bson.M{"_id": objectID},
	)

	return err
}