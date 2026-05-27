package service

import (
	"fmt"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/repository"
	"go.mongodb.org/mongo-driver/mongo"
)

type CategoryService struct {
	repo *repository.CategoryRepository
}

func NewCategoryService(db *mongo.Database) *CategoryService {

	return &CategoryService{
		repo: repository.NewCategoryRepository(db),
	}
}

func (s *CategoryService) GetAllCategory() (
	[]model.Category,
	error,
) {

	return s.repo.FindAll()
}

// func (s *CategoryService) CreateCategory(input dto.CreateCategoryDTO,) (model.Category, error) {

// 	entity := model.Category{
// 		Name: input.Name,
// 	}

// 	result, err := s.repo.Save(entity)
// 	fmt.Println("response", result)

// 	if err != nil {
// 		return model.Category{}, err
// 	}

// 	return result, nil
// }

func (s *CategoryService) CreateCategory(
	input dto.CreateCategoryDTO,
) (model.Category, error) {

	// Empty validation
	if input.CategoryName == "" {
		return model.Category{},
			fmt.Errorf("category required")
	}

	// Duplicate check
	existing, err :=
		s.repo.FindByName(input.CategoryName)

	if err == nil && existing.CategoryName != "" {
		return model.Category{},
			fmt.Errorf("category already exists")
	}

	entity := model.Category{
		CategoryName: input.CategoryName,
	}

	result, err := s.repo.Save(entity)

	if err != nil {
		return model.Category{}, err
	}

	return result, nil
}

// update
func (s *CategoryService) UpdateCategory(
	id string,
	input dto.CreateCategoryDTO,
) (model.Category, error) {

	entity := model.Category{
		CategoryName: input.CategoryName,
	}

	result, err := s.repo.Update(id, entity)

	if err != nil {
		return model.Category{}, err
	}

	return result, nil
}

// delete
func (s *CategoryService) DeleteCategory(
	id string,
) error {

	return s.repo.Delete(id)
}