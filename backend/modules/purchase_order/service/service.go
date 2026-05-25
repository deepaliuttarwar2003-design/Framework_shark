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
