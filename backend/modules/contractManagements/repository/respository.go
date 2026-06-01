package repository

import (
	"context"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
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
