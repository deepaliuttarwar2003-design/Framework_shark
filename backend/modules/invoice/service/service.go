package service

import (
	"fmt"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/repository"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Service struct {
	repo *repository.Repository
}

func NewService(db *mongo.Database) *Service {
	return &Service{
		repo: repository.NewRepository(db),
	}
}

func (s *Service) GetAll() ([]model.Invoice, error) {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateInvoiceDTO) (model.Invoice, error) {

	if input.CustomerName == "" {
		return model.Invoice{},
			fmt.Errorf("customer name is required")
	}

	if input.CustomerEmail == "" {
		return model.Invoice{},
			fmt.Errorf("customer email is required")
	}

	if len(input.Items) == 0 {
		return model.Invoice{},
			fmt.Errorf("at least one item is required")
	}

	var subtotal float64

	for _, item := range input.Items {

		amount := item.Price * float64(item.Quantity)

		subtotal += amount
	}

	tax := subtotal * 0.18
	total := subtotal + tax

	invoiceNo := fmt.Sprintf(
		"INV-%d",
		time.Now().Unix(),
	)

	entity := model.Invoice{
		ID:            primitive.NewObjectID(),
		InvoiceNo:     invoiceNo,
		CustomerName:  input.CustomerName,
		CustomerEmail: input.CustomerEmail,
		InvoiceDate:   time.Now().Format("2006-01-02"),
		DueDate:       input.DueDate,
		Subtotal:      subtotal,
		Tax:           tax,
		TotalAmount:   total,
		Status:        "Pending",
		// Items:         items,
		Payment: input.Payment,
	}

	result, err := s.repo.Create(entity)
	if err != nil {
		return model.Invoice{}, err
	}

	return result, nil
}

func (s *Service) Update(
	id string,
	input dto.CreateInvoiceDTO,
) (*model.Invoice, error) {

	var subtotal float64

	for _, item := range input.Items {

		amount := item.Price * float64(item.Quantity)

		subtotal += amount
	}

	tax := subtotal * 0.18
	total := subtotal + tax

	entity := model.Invoice{
		InvoiceNo:     input.InvoiceNo,
		InvoiceDate:   time.Now().Format("2006-01-02"),
		CustomerName:  input.CustomerName,
		CustomerEmail: input.CustomerEmail,
		DueDate:       input.DueDate,
		Subtotal:      subtotal,
		Tax:           tax,
		TotalAmount:   total,
		Status:        input.Status,
		// Items:         input.Items,
		Payment: input.Payment,
	}

	updated, err := s.repo.Update(id, entity)
	if err != nil {
		return nil, err
	}

	return &updated, nil
}

func (s *Service) Delete(id string) error {
	return s.repo.Delete(id)
}
