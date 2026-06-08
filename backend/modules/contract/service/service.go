package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract/dto"
	contract "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract"
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

func (s *Service) GetAll() []model.Contract {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateContractDTO) model.Contract {

	entity := model.Contract{
		ID:   contract.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("contract.created", result)

	return result
}