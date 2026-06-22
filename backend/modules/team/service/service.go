package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/team/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(r *repository.Repository) *Service {
	return &Service{repo: r}
}

func (s *Service) GetAll() (interface{}, error) {
	return s.repo.GetAll()
}

func (s *Service) Create(data interface{}) (interface{}, error) {
	return s.repo.Create(data)
}

func (s *Service) GetByID(id string) (interface{}, error) {
	return s.repo.GetByID(id)
}

func (s *Service) Update(id string, data interface{}) (interface{}, error) {
	return s.repo.Update(id, data)
}

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}