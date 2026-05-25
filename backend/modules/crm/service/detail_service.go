package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (s *Service) AddDetail(req dto.CreateDetailDTO) error {

	data := model.Detail{
		CRMID:       req.CRMID,
		Description: req.Description,
		Status:      req.Status,
		Priority:    req.Priority,
	}

	return s.repo.AddDetail(data)
}

func (s *Service) GetDetail() ([]model.Detail, error) {

	return s.repo.GetDetail()
}
