package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement/dto"
	TeamManagement "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/TeamManagement"
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

func (s *Service) GetAll() []model.TeamManagement {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateTeamManagementDTO) model.TeamManagement {

	entity := model.TeamManagement{
		ID:   TeamManagement.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("TeamManagement.created", result)

	return result
}