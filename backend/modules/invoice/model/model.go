package invoice


type Invoice struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	InvoiceNo   string    `json:"invoiceNo"`
	CustomerID  uint      `json:"customerId"`
	InvoiceDate string `json:"invoiceDate"`
	DueDate     string `json:"dueDate"`
	Subtotal    float64   `json:"subtotal"`
	Tax         float64   `json:"tax"`
	TotalAmount float64   `json:"totalAmount"`
	Status      string    `json:"status"`

	Items []InvoiceItem `json:"items"`
}

type InvoiceItem struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	InvoiceID uint    `json:"invoiceId"`
	ProductID uint    `json:"productId"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
	Amount    float64 `json:"amount"`
}