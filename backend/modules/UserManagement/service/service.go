package service

import (
	
	// events "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/repository"
	"github.com/google/uuid"
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

func (s *Service) GetAll() ([]model.UserManagement, error) {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateUserManagementDTO) (model.UserManagement, error) {

	entity := model.UserManagement{
		ID:        uuid.New().String(),
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Email:     input.Email,
		Phone:     input.Phone,
		Role:      input.Role,
		Status:    input.Status,
		Password:  input.Password,
		Avatar:    input.Avatar,
		Address:   input.Address,
		
	}

	result, err := s.repo.Create(entity)
	if err != nil {
		return model.UserManagement{}, err
	}
	// events.Publish("UserManagement.created", result)

	return result, nil
}

func (s *Service) Update(id string, input dto.CreateUserManagementDTO) (*model.UserManagement, error) {
	entity := model.UserManagement{
		ID:        uuid.New().String(),
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Email:     input.Email,
		Phone:     input.Phone,
		Role:      input.Role,
		Status:    input.Status,
		Password:  input.Password,
		Avatar:    input.Avatar,
		Address:   input.Address,
	}

	updated, err := s.repo.Update(id, entity)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
