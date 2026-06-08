package service

import (
    "time"

    repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/repository"
    model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"
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

func (s *Service) FindByID(id string) (model.ContractManagement, bool) {
    return s.repo.FindByID(id)
}

func (s *Service) Create(input model.ContractManagement) model.ContractManagement {
    now := time.Now().UTC().Format(time.RFC3339)
    input.ID = contract_management.GenerateID()
    input.CreatedAt = now
    input.UpdatedAt = now

    result := s.repo.Save(input)
    events.Publish("contract_management.created", result)
    return result
}

func (s *Service) Update(id string, input model.ContractManagement) (model.ContractManagement, bool) {
    existing, found := s.repo.FindByID(id)
    if !found {
        return model.ContractManagement{}, false
    }

    input.ID = id
    input.CreatedAt = existing.CreatedAt
    input.UpdatedAt = time.Now().UTC().Format(time.RFC3339)

    return s.repo.Update(id, input)
}

func (s *Service) Delete(id string) bool {
    return s.repo.Delete(id)
}
