package service

import (
	"context"
	"time"

	"github.com/google/uuid"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) Create(ctx context.Context, req *dto.CreateSalesRequest) error {

	sales := &model.Sales{
		ID:              uuid.New().String(),
		InvoiceNo:       req.InvoiceNo,
		CustomerName:    req.CustomerName,
		CompanyName:     req.CompanyName,
		CustomerContact: req.CustomerContact,
		CustomerAddress: req.CustomerAddress,
		GSTIN:           req.GSTIN,
		Items:           req.Items,
		SubTotal:        req.SubTotal,
		GST:             req.GST,
		Discount:        req.Discount,
		GrandTotal:      req.GrandTotal,
		PaymentMethod:   req.PaymentMethod,
		PaymentStatus:   req.PaymentStatus,
		SalesStatus:     req.SalesStatus,
		InvoiceFile:     req.InvoiceFile,
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}

	return s.repo.Create(ctx, sales)
}

func (s *Service) GetAll(ctx context.Context) ([]model.Sales, error) {

	return s.repo.GetAll(ctx)
}

func (s *Service) GetByID(ctx context.Context, id string) (*model.Sales, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Update(ctx context.Context, id string, req *dto.UpdateSalesRequest) error {

	sales := &model.Sales{
		ID:              id,
		InvoiceNo:       req.InvoiceNo,
		CustomerName:    req.CustomerName,
		CompanyName:     req.CompanyName,
		CustomerContact: req.CustomerContact,
		CustomerAddress: req.CustomerAddress,
		GSTIN:           req.GSTIN,
		Items:           req.Items,
		SubTotal:        req.SubTotal,
		GST:             req.GST,
		Discount:        req.Discount,
		GrandTotal:      req.GrandTotal,
		PaymentMethod:   req.PaymentMethod,
		PaymentStatus:   req.PaymentStatus,
		SalesStatus:     req.SalesStatus,
		InvoiceFile:     req.InvoiceFile,
		UpdatedAt:       time.Now(),
	}

	return s.repo.Update(ctx, id, sales)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
