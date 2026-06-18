package service

import (
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/repository"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/model"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	auth "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth"
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

func (s *Service) GetAll() []model.Auth {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateAuthDTO) model.Auth {

	entity := model.Auth{
		ID:   auth.GenerateID(),
		Name: input.Name,
	}

	result := s.repo.Save(entity)

	events.Publish("auth.created", result)

	return result
}