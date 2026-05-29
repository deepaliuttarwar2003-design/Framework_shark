package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {

	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(req dto.CreateCrmDTO) (interface{}, error) {

	data := model.Crm{
		LeadTitle:     req.LeadTitle,
		FirstName:     req.FirstName,
		LastName:      req.LastName,
		Telephone:     req.Telephone,
		Email:         req.Email,
		LeadValue:     req.LeadValue,
		Notes:         req.Notes,
		Source:        req.Source,
		Category:      req.Category,
		Tags:          req.Tags,
		LastContacted: req.LastContacted,
		CompanyName:   req.CompanyName,
		Street:        req.Street,
		City:          req.City,
		State:         req.State,
		ZipCode:       req.ZipCode,
		Country:       req.Country,
		Website:       req.Website,
		Stage:         req.Stage,
	}

	return s.repo.Create(data)
}

func (s *Service) GetAll() ([]model.Crm, error) {

	return s.repo.GetAll()
}
