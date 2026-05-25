package model

import "time"

type PurchaseOrderItem struct {
	ProductName string  `bson:"product_name" json:"product_name"`
	Quantity    int     `bson:"quantity" json:"quantity"`
	Price       float64 `bson:"price" json:"price"`
	Total       float64 `bson:"total" json:"total"`
}

type PurchaseOrder struct {
	ID string `bson:"_id,omitempty" json:"id"`

	PONumber string `bson:"po_number" json:"po_number"`

	SupplierName    string `bson:"supplier_name" json:"supplier_name"`
	CompanyName     string `bson:"company_name" json:"company_name"`
	SupplierContact string `bson:"supplier_contact" json:"supplier_contact"`
	SupplierAddress string `bson:"supplier_address" json:"supplier_address"`
	GSTIN           string `bson:"gstin" json:"gstin"`

	Status string `bson:"status" json:"status"`

	Items []PurchaseOrderItem `bson:"items" json:"items"`

	GrandTotal float64 `bson:"grand_total" json:"grand_total"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
