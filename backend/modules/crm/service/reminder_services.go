package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type ReminderService struct {
	repo *repository.ReminderRepository
}

func NewReminderService(repo *repository.ReminderRepository) *ReminderService {
	return &ReminderService{
		repo: repo,
	}
}

func (s *ReminderService) AddReminder(data model.Reminder) error {
	return s.repo.AddReminder(data)
}

func (s *ReminderService) GetAllReminders() ([]model.Reminder, error) {
	return s.repo.GetAllReminders()
}
