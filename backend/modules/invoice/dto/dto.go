package invoice

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
)

type CreateInvoiceDTO struct {
	InvoiceNo     string              `json:"invoiceNo" binding:"required"`
	CustomerName  string              `json:"customerName" binding:"required" `
	CustomerEmail string              `json:"customerEmail" binding:"required"`
	InvoiceDate   string              `json:"invoiceDate" binding:"required"`
	DueDate       string              `json:"dueDate" binding:"required"`
	Subtotal      float64             `json:"subtotal" binding:"required"`
	Tax           float64             `json:"tax" binding:"required"`
	TotalAmount   float64             `json:"totalAmount" binding:"required"`
	Status        string              `json:"status" binding:"required"`
	Payment       string              `json:"payment" binding:"required"`
	Items         []model.InvoiceItem `gorm:"foreignKey:InvoiceID" json:"items"`
}

type CreateInvoiceItemDTO struct {
	InvoiceID uint    `json:"invoiceId"`
	ProductID uint    `json:"productId"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
	Amount    float64 `json:"amount"`
}
