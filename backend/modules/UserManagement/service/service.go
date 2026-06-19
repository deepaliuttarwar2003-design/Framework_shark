package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement/dto"
	UserManagement "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/UserManagement"
	events "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
)

type Service struct {
	repo *repository.Repository
}

func NewService() *Service {
	return &Service{
		repo: repository.NewRepository(),
	}
}

func (s *Service) GetAll() []model.UserManagement {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateUserManagementDTO) model.UserManagement {

	entity := model.UserManagement{
		ID:   UserManagement.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("UserManagement.created", result)

	return result
}