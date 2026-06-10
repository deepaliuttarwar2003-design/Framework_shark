package service

import (
	"context"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (s *Service) GetByID(ctx context.Context, id primitive.ObjectID) (*model.ContractManagements, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Update(
	ctx context.Context,
	id primitive.ObjectID,
	req *dto.UpdateContractRequest,
) error {

	return s.repo.Update(ctx, id, req)
}

func (s *Service) Delete(ctx context.Context, id primitive.ObjectID) error {
	return s.repo.Delete(ctx, id)
}