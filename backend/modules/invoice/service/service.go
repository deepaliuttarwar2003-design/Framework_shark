package service

import (
	"fmt"
	"time"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/dto"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
	repository "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService() *Service {
	return &Service{
		repo: repository.NewRepository(),
	}
}

func (s *Service) GetAll() []model.Invoice {
	return s.repo.FindAll()
}

func (s *Service) Create(input dto.CreateInvoiceDTO) (*model.Invoice, error) {

	var subtotal float64
	var items []model.InvoiceItem

	for _, item := range input.Items {

		price := 1000.0

		amount := price * float64(item.Quantity)

		subtotal += amount

		items = append(items, model.InvoiceItem{
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     price,
			Amount:    amount,
		})
	}

	tax := subtotal * 0.18
	total := subtotal + tax

	invoiceNumber := fmt.Sprintf(
		"INV-%s",
		time.Now().Format("20060102150405"),
	)

	invoice := model.Invoice{
		InvoiceNo:   invoiceNumber,
		CustomerID:  input.CustomerID,
		InvoiceDate: time.Now().Format("2006-01-02"),
		DueDate:     input.DueDate,
		Subtotal:    subtotal,
		Tax:         tax,
		TotalAmount: total,
		Status:      "Pending",
		Items:       items,
	}

	// err = s.repo.CreateInvoice(&invoice)
	// if err != nil {
	// 	return nil, err
	// }

	return &invoice, nil
}