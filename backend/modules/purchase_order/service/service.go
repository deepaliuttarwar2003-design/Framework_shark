package service

import (
	"time"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/repository"
	//"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/utils"
)

type PurchaseOrderService struct {
	repo *repository.Repository
}

func NewPurchaseOrderService(
	repo *repository.Repository,
) *PurchaseOrderService {

	return &PurchaseOrderService{
		repo: repo,
	}
}

func (s *PurchaseOrderService) Create(
	req dto.CreatePurchaseOrderRequest,
) (*model.PurchaseOrder, error) {

	var total float64

	var items []model.PurchaseOrderItem

	for _, item := range req.Items {

		total += item.Total

		items = append(items, model.PurchaseOrderItem{
			ProductName: item.ProductName,
			Quantity:    item.Quantity,
			Price:       item.Price,
			Total:       item.Total,
		})

	}

	order := &model.PurchaseOrder{
		//ID: utils.GenerateID(),

		PONumber: "PO-2026",

		SupplierName:    req.SupplierName,
		CompanyName:     req.CompanyName,
		SupplierContact: req.SupplierContact,
		SupplierAddress: req.SupplierAddress,
		GSTIN:           req.GSTIN,

		Status: req.Status,

		Items: items,

		GrandTotal: total,

		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := s.repo.Create(order)

	if err != nil {
		return nil, err
	}

	return order, nil
}

func (s *PurchaseOrderService) GetAll() (
	[]model.PurchaseOrder,
	error,
) {
	return s.repo.GetAll()
}


func (s *PurchaseOrderService) GetByID(id string) (
	*model.PurchaseOrder,
	error,
) {
	return s.repo.GetByID(id)
}

func (s *PurchaseOrderService) Update(
	id string,
	req dto.UpdatePurchaseOrderRequest,
) error {

	order, err := s.repo.GetByID(id)

	if err != nil {
		return err
	}

	order.SupplierName = req.SupplierName
	order.CompanyName = req.CompanyName
	order.SupplierContact = req.SupplierContact
	order.SupplierAddress = req.SupplierAddress
	order.GSTIN = req.GSTIN

	order.Status = req.Status

	var total float64

	var items []model.PurchaseOrderItem

	for _, item := range req.Items {

		total += item.Total

		items = append(items, model.PurchaseOrderItem{
			ProductName: item.ProductName,
			Quantity:    item.Quantity,
			Price:       item.Price,
			Total:       item.Total,
		})

	}

	order.Items = items

	order.GrandTotal = total

	order.UpdatedAt = time.Now()

	return s.repo.Update(id, order)
}

func (s *PurchaseOrderService) Delete(id string) error {
	return s.repo.Delete(id)
}			

// func (s *PurchaseOrderService) GetAll() ([]model.PurchaseOrder, error) {

// 	var orders []model.PurchaseOrder

// 	cursor, err := r.collection.Find(
// 		context.Background(),
// 		map[string]interface{}{},
// 	)

// 	if err != nil {
// 		return nil, err
// 	}

// 	defer cursor.Close(context.Background())

// 	for cursor.Next(context.Background()) {

// 		var order model.PurchaseOrder

// 		cursor.Decode(&order)

// 		orders = append(orders, order)
// 	}

// 	return orders, nil
// }