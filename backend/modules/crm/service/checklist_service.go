package service

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/repository"
)

type ChecklistService struct {
	repo *repository.ChecklistRepository
}

func NewChecklistService(repo *repository.ChecklistRepository) *ChecklistService {
	return &ChecklistService{
		repo: repo,
	}
}

func (s *ChecklistService) AddChecklist(data model.Checklist) error {
	return s.repo.AddChecklist(data)
}

func (s *ChecklistService) GetAllChecklist() ([]model.Checklist, error) {
	return s.repo.GetAllChecklist()
}
