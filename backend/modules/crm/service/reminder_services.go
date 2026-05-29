package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
)

func (s *Service) AddReminder(req dto.CreateReminderDTO) error {

	data := model.Reminder{
		CRMID: req.CRMID,
		Title: req.Title,
		Date:  req.Date,
		Time:  req.Time,
	}

	return s.repo.AddReminder(data)
}

func (s *Service) GetAllReminder() ([]model.Reminder, error) {

	return s.repo.GetAllReminder()
}
