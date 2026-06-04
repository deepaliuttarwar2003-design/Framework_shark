package service

import (
	"fmt"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/repository"
	"go.mongodb.org/mongo-driver/mongo"
	// events "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/events"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

func (s *Service) GetAll() ([]model.Estimate, error) {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateEstimateDTO) (model.Estimate, error) {

	if input.ProviderName == "" {
		return model.Estimate{},
			fmt.Errorf("Provider name is required")
	}

	if input.ProviderAddress == "" {
		return model.Estimate{},
			fmt.Errorf("Provider Addredd is required")
	}

	if input.ClientAddress == "" {
		return model.Estimate{},
			fmt.Errorf("Client address is required")
	}

	if input.ClientName == "" {
		return model.Estimate{},
			fmt.Errorf("Client name is required")
	}

	if input.ScopeOfServices == "" {
		return model.Estimate{},
			fmt.Errorf("Scope Of Services is required")
	}

	if input.AdjustmentLabel == "" {
		return model.Estimate{},
			fmt.Errorf("Adjustment label is required")
	}

	if input.AdvancePaymentPercent == 0 {
		return model.Estimate{},
			fmt.Errorf("Advance Payment Percent is required")
	}

	if input.BalancePaymentPercent == 0 {
		return model.Estimate{},
			fmt.Errorf("Balance Payment Percent is required")
	}
	if input.DiscountPercentage == 0 {
		return model.Estimate{},
			fmt.Errorf("Discount Percentage is required")
	}
	if input.GSTPercentage == 0 {
		return model.Estimate{},
			fmt.Errorf("GST Percentage is required")
	}
	if input.AdjustmentAmount == 0 {
		return model.Estimate{},
			fmt.Errorf("Adjustment amount is required")
	}

	if input.Status == "" {
		return model.Estimate{},
			fmt.Errorf("Status is required")
	}

	date, err := time.Parse("06-01-2026", input.Date)
	if err != nil {
		return model.Estimate{}, err
	}

	entity := model.Estimate{

		Date:                  date,
		Status:                input.Status,
		ProviderName:          input.ProviderName,
		ProviderAddress:       input.ProviderAddress,
		ClientName:            input.ClientName,
		ClientAddress:         input.ClientAddress,
		ScopeOfServices:       input.ScopeOfServices,
		AdvancePaymentPercent: input.AdvancePaymentPercent,
		BalancePaymentPercent: input.BalancePaymentPercent,
		DiscountPercentage:    input.DiscountPercentage,
		GSTPercentage:         input.GSTPercentage,
		AdjustmentLabel:       input.AdjustmentLabel,
		AdjustmentAmount:      input.AdjustmentAmount,
		Items:                 input.Items,
	}

	result, err := s.repo.Create(entity)
	if err != nil {
		return model.Estimate{}, err
	}
	// events.Publish("estimate.created", result)

	return result, nil
}

func (s *Service) Update(id string, input dto.CreateEstimateDTO) (*model.Estimate, error) {

	date, err := time.Parse("2006-01-02", input.Date)
	if err != nil {
		return nil, err
	}

	entity := model.Estimate{
		Date:                  date,
		Status:                input.Status,
		ProviderName:          input.ProviderName,
		ProviderAddress:       input.ProviderAddress,
		ClientName:            input.ClientName,
		ClientAddress:         input.ClientAddress,
		ScopeOfServices:       input.ScopeOfServices,
		AdvancePaymentPercent: input.AdvancePaymentPercent,
		BalancePaymentPercent: input.BalancePaymentPercent,
		DiscountPercentage:    input.DiscountPercentage,
		GSTPercentage:         input.GSTPercentage,
		AdjustmentLabel:       input.AdjustmentLabel,
		AdjustmentAmount:      input.AdjustmentAmount,
		Items:                 input.Items,
	}

	updated, err := s.repo.Update(id, entity)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

// delete

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
