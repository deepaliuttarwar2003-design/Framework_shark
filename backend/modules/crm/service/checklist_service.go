package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (s *Service) AddChecklist(req dto.CreateChecklistDTO) error {

	data := model.Checklist{
		CRMID:     req.CRMID,
		Title:     req.Title,
		IsChecked: req.IsChecked,
	}

	return s.repo.AddChecklist(data)
}
