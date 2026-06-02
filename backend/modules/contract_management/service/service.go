package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/dto"
	contract_management "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management"
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

func (s *Service) GetAll() []model.ContractManagement {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateContractManagementDTO) model.ContractManagement {

	entity := model.ContractManagement{
		ID:   contract_management.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("contract_management.created", result)

	return result
}