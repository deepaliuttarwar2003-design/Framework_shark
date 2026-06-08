package model

import "time"

type SalesItem struct {
	ProductName string  `json:"product_name" bson:"product_name"`
	Quantity    int     `json:"quantity" bson:"quantity"`
	Price       float64 `json:"unit_price" bson:"price"`
	GSTPercent  float64 `json:"gst_percent" bson:"gst_percent"`
	Total       float64 `json:"total" bson:"total"`
}

type Sales struct {
	ID              string      `json:"id" bson:"id"`
	CustomerName    string      `json:"customer_name" bson:"customer_name"`
	CustomerContact string      `json:"customer_contact" bson:"customer_contact"`
	CustomerAddress string      `json:"customer_address" bson:"customer_address"`
	GSTIN           string      `json:"gstin" bson:"gstin"`
	Items           []SalesItem `json:"items" bson:"items"`
	SubTotal        float64     `json:"subtotal" bson:"subtotal"`
	GrandTotal      float64     `json:"grand_total" bson:"grand_total"`
	PaymentMethod   string      `json:"payment_method" bson:"payment_method"`
	PaymentStatus   string      `json:"payment_status" bson:"payment_status"`
	CreatedAt       time.Time   `json:"created_at" bson:"created_at"`
	UpdatedAt       time.Time   `json:"updated_at" bson:"updated_at"`
}
