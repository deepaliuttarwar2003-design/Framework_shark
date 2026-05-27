package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management/dto"
	Project_Management "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Project_Management"
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

func (s *Service) GetAll() []model.ProjectManagement {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateProjectManagementDTO) model.ProjectManagement {

	entity := model.ProjectManagement{
		ID:   Project_Management.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("Project_Management.created", result)

	return result
}