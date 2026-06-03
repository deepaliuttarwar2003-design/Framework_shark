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

func (s *Service) GetByID(ctx context.Context, id string) (*model.ContractManagements, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Update(
	ctx context.Context,
	id string,
	req *dto.UpdateContractRequest,
) error {

	return s.repo.Update(ctx, id, req)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
