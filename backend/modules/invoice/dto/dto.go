package invoice

import (
	// model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
)

type CreateInvoiceDTO struct {
	InvoiceNo     string               `json:"invoiceNo" binding:"required"`
	CustomerName  string               `json:"customerName" binding:"required"`
	CustomerEmail string               `json:"customerEmail" binding:"required"`
	InvoiceDate   string               `json:"invoiceDate" binding:"required"`
	DueDate       string               `json:"dueDate" binding:"required"`
	Subtotal      float64              `json:"subtotal" `
	Tax           float64              `json:"tax"`
	TotalAmount   float64              `json:"totalAmount"`
	Status        string               `json:"status" binding:"required"`
	Payment       string               `json:"payment" binding:"required"`
	Items         []InvoiceItemPayload `json:"items" binding:"required"`
}

type InvoiceItemPayload struct {
	ProductID int     `json:"productId" binding:"required"`
	Quantity  int     `json:"quantity" binding:"required"`
	Price     float64 `json:"price" binding:"required"`
	Amount    float64 `json:"amount" binding:"required"`
}
