package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal/dto"
	Porposal "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/Porposal"
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

func (s *Service) GetAll() []model.Porposal {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreatePorposalDTO) model.Porposal {

	entity := model.Porposal{
		ID:   Porposal.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("Porposal.created", result)

	return result
}