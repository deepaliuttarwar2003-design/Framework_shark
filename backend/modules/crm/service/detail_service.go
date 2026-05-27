package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type DetailService struct {
	repo *repository.DetailRepository
}

func NewDetailService(repo *repository.DetailRepository) *DetailService {
	return &DetailService{
		repo: repo,
	}
}

func (s *DetailService) AddDetail(data model.Detail) error {
	return s.repo.AddDetail(data)
}

func (s *DetailService) GetDetail() ([]model.Detail, error) {
	return s.repo.GetDetail()
}
