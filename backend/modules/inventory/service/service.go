package service

import (
	"fmt"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

func (s *Service) GetAll() ([]model.Inventory, error) {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateInventoryDTO) (model.Inventory, error) {

	if input.Name == "" {
		return model.Inventory{},
			fmt.Errorf("name required")
	}

	if input.Category == "" {
		return model.Inventory{},
			fmt.Errorf("category required")
	}

	if input.Price == 0 {
		return model.Inventory{},
			fmt.Errorf("price required")
	}

	// Use category name as string ID for now
	catID, err := primitive.ObjectIDFromHex(input.Category)
	if err != nil {
		// If it's not a valid ObjectID, use a generated ID based on the category name
		catID = primitive.NewObjectID()
	}

	if input.Status == "" {
		input.Status = "Active"
	}

	entity := model.Inventory{
		// ID:   inventory.GenerateID(),
		Name:       input.Name,
		SKU:        input.SKU,
		Price:      input.Price,
		Stock:      input.Stock,
		CategoryID: catID,
		Status:     input.Status,
	}

	result, err := s.repo.Create(entity)
	if err != nil {
		return model.Inventory{}, err
	}

	return result, nil
}

// UPDATE

func (s *Service) Update(id string, input dto.CreateInventoryDTO) (*model.Inventory, error) {
	catID, err := primitive.ObjectIDFromHex(input.Category)

	if err != nil {
		// If it's not a valid ObjectID, use a generated ID
		catID = primitive.NewObjectID()
	}

	entity := model.Inventory{
		SKU:        input.SKU,
		Name:       input.Name,
		Price:      input.Price,
		Stock:      input.Stock,
		CategoryID: catID,
		Status:     input.Status,
	}

	updated, err := s.repo.Update(id, entity)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

// DELETE

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
