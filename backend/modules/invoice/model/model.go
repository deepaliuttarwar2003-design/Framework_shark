package invoice

import "go.mongodb.org/mongo-driver/bson/primitive"

type Invoice struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	InvoiceNo     string             `json:"invoiceNo"`
	CustomerName  string             `json:"customerName"`
	CustomerEmail string             `json:"customerEmail"`
	InvoiceDate   string             `json:"invoiceDate"`
	DueDate       string             `json:"dueDate"`
	Subtotal      float64            `json:"subtotal"`
	Tax           float64            `json:"tax"`
	TotalAmount   float64            `json:"totalAmount"`
	Status        string             `json:"status"`
	Payment		  string			 `json:"payment"`
	Items []InvoiceItem `json:"items"`
}

type InvoiceItem struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	InvoiceID uint               `json:"invoiceId"`
	ProductID uint               `json:"productId"`
	Quantity  int                `json:"quantity"`
	Price     float64            `json:"price"`
	Amount    float64            `json:"amount"`
}
