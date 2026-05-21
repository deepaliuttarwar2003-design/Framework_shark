package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	crm "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm"
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

func (s *Service) GetAll() []model.Crm {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateCrmDTO) model.Crm {

	entity := model.Crm{
		ID:   crm.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("crm.created", result)

	return result
}