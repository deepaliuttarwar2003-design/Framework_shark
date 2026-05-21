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
	}

	return s.repo.Create(data)
}

func (s *Service) GetAll() ([]model.Crm, error) {
	return s.repo.GetAll()
}

func (s *Service) Update(id string, req dto.CreateCrmDTO) error {

	updateData := map[string]interface{}{
		"lead_title":     req.LeadTitle,
		"first_name":     req.FirstName,
		"last_name":      req.LastName,
		"telephone":      req.Telephone,
		"email":          req.Email,
		"lead_value":     req.LeadValue,
		"notes":          req.Notes,
		"source":         req.Source,
		"category":       req.Category,
		"tags":           req.Tags,
		"last_contacted": req.LastContacted,
		"company_name":   req.CompanyName,
		"street":         req.Street,
		"city":           req.City,
		"state":          req.State,
		"zip_code":       req.ZipCode,
		"country":        req.Country,
		"website":        req.Website,
	}

	return s.repo.Update(id, updateData)
}

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
