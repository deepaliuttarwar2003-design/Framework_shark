package repository

import (
	"context"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{
		collection: db.Collection("contracts"),
	}
}

func (r *Repository) FindAll(ctx context.Context) ([]model.ContractManagements, error) {

	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var contracts []model.ContractManagements

	if err := cursor.All(ctx, &contracts); err != nil {
		return nil, err
	}

	return contracts, nil

}

func (r *Repository) Create(
	ctx context.Context,
	req *dto.CreateContractRequest,
) (*model.ContractManagements, error) {

	var items []model.ContractItem

	for _, item := range req.Items {
		items = append(items, model.ContractItem{
			Description: item.Description,
			Qty:         item.Qty,
			Unit:        item.Unit,
			Rate:        item.Rate,
		})
	}

	contract := &model.ContractManagements{
		ContractNo: req.ContractNo,
		Title:      req.Title,
		PartyName:  req.PartyName,

		StartDate: req.StartDate,
		EndDate:   req.EndDate,

		Status: req.Status,

		TemplateID: req.TemplateID,

		Items: items,

		Discount: req.Discount,
		GST:      req.GST,

		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err := r.collection.InsertOne(ctx, contract)
	if err != nil {
		return nil, err
	}

	return contract, nil
}

func (r *Repository) GetByID(ctx context.Context, id primitive.ObjectID) (*model.ContractManagements, error) {

	var contract model.ContractManagements

	err := r.collection.FindOne(
		ctx,
		bson.M{"_id": id},
	).Decode(&contract)

	if err != nil {
		return nil, err
	}

	return &contract, nil
}

func (r *Repository) Update(
	ctx context.Context,
	id primitive.ObjectID,
	req *dto.UpdateContractRequest,
) error {

	update := bson.M{
		"contract_no": req.ContractNo,
		"title":       req.Title,
		"party_name":  req.PartyName,
		"start_date":  req.StartDate,
		"end_date":    req.EndDate,
		"status":      req.Status,
		"template_id": req.TemplateID,
		"discount":    req.Discount,
		"gst":         req.GST,
		"updated_at":  time.Now(),
	}

	_, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.M{"$set": update},
	)

	return err
}

func (r *Repository) Delete(ctx context.Context, id primitive.ObjectID) error {

	_, err := r.collection.DeleteOne(
		ctx,
		bson.M{"_id": id},
	)

	return err
}