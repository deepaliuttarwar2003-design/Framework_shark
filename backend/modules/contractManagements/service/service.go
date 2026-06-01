package service

import (
	"context"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(
	ctx context.Context,
	req *dto.CreateContractRequest,
) error {

	_, err := s.repo.Create(ctx, req)

	return err
}

func (s *Service) GetAll(
	ctx context.Context,
) ([]model.ContractManagements, error) {

	return s.repo.FindAll(ctx)
}
