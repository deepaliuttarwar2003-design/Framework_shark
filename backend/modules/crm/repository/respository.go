package repository

import (
	"context"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {

	return &Repository{
		db: db,
	}
}

func (r *Repository) Create(data model.Crm) (interface{}, error) {

	collection := r.db.Collection("crm")

	result, err := collection.InsertOne(
		context.Background(),
		data,
	)

	return result, err
}

func (r *Repository) GetAll() ([]model.Crm, error) {

	collection := r.db.Collection("crm")

	cursor, err := collection.Find(
		context.Background(),
		bson.M{},
	)

	if err != nil {
		return nil, err
	}

	var crm []model.Crm

	err = cursor.All(context.Background(), &crm)

	return crm, err
}

func (r *Repository) Update(id string, req dto.UpdateCrmDTO) (*model.Crm, error) {

	collection := r.db.Collection("crm")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	update := bson.M{
		"$set": bson.M{
			"lead_title":     req.LeadTitle,
			"first_name":     req.FirstName,
			"last_name":      req.LastName,
			"telephone":      req.Telephone,
			"email":          req.Email,
			"lead_value":     req.LeadValue,
			"notes":          req.Notes,
			"source":         req.Source,
			"category":       req.Category,
			"tags":           req.Tags,
			"last_contacted": req.LastContacted,
			"company_name":   req.CompanyName,
			"street":         req.Street,
			"city":           req.City,
			"state":          req.State,
			"zip_code":       req.ZipCode,
			"country":        req.Country,
			"website":        req.Website,
		},
	}

	_, err = collection.UpdateOne(
		context.Background(),
		bson.M{"_id": objectID},
		update,
	)

	if err != nil {
		return nil, err
	}

	var crm model.Crm

	err = collection.FindOne(
		context.Background(),
		bson.M{"_id": objectID},
	).Decode(&crm)

	if err != nil {
		return nil, err
	}

	return &crm, nil
}

func (r *Repository) Delete(id string) error {

	collection := r.db.Collection("crm")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = collection.DeleteOne(
		context.Background(),
		bson.M{"_id": objectID},
	)

	return err
}
