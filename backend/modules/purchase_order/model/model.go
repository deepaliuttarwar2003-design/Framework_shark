package model

import "time"

type PurchaseOrderItem struct {
	ProductName string  `json:"product_name" bson:"product_name"`
	Quantity    int     `json:"quantity" bson:"quantity"`
	Price       float64 `json:"price" bson:"price"`
	Total       float64 `json:"total" bson:"total"`
}

type PurchaseOrder struct {
	ID string `json:"id" bson:"id"`

	PONumber string `json:"po_number" bson:"po_number"`

	SupplierName    string `json:"supplier_name" bson:"supplier_name"`
	CompanyName     string `json:"company_name" bson:"company_name"`
	SupplierContact string `json:"supplier_contact" bson:"supplier_contact"`
	SupplierAddress string `json:"supplier_address" bson:"supplier_address"`
	GSTIN           string `json:"gstin" bson:"gstin"`

	Status string `json:"status" bson:"status"`

	Items []PurchaseOrderItem `json:"items" bson:"items"`

	GrandTotal float64 `json:"grand_total" bson:"grand_total"`

	CreatedAt time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time `json:"updated_at" bson:"updated_at"`
}
