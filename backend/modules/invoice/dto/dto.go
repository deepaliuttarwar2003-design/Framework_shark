package invoice

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"
	
)

type CreateInvoiceDTO struct {
	InvoiceNo   string    `json:"invoiceNo"`
	CustomerID  uint      `json:"customerId"`
	InvoiceDate string `json:"invoiceDate"`
	DueDate     string `json:"dueDate"`
	Subtotal    float64   `json:"subtotal"`
	Tax         float64   `json:"tax"`
	TotalAmount float64   `json:"totalAmount"`
	Status      string    `json:"status"`

	Items []model.InvoiceItem `gorm:"foreignKey:InvoiceID" json:"items"`
}

type CreateInvoiceItemDTO struct {
	InvoiceID uint    `json:"invoiceId"`
	ProductID uint    `json:"productId"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
	Amount    float64 `json:"amount"`

}
