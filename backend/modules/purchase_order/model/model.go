package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PurchaseOrderItem struct {
	ProductName string  `json:"product_name" bson:"product_name"`
	Quantity    int     `json:"quantity" bson:"quantity"`
	Price       float64 `json:"price" bson:"price"`
	Total       float64 `json:"total" bson:"total"`
}

type PurchaseOrder struct {

	 ID primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	PONumber string `bson:"po_number" json:"po_number"`
	SupplierName    string `bson:"supplier_name" json:"supplier_name"`
	CompanyName     string `bson:"company_name" json:"company_name"`
	SupplierContact string `bson:"supplier_contact" json:"supplier_contact"`
	SupplierAddress string `bson:"supplier_address" json:"supplier_address"`
	GSTIN           string `bson:"gstin" json:"gstin"`

	Status string `json:"status" bson:"status"`

	Items []PurchaseOrderItem `json:"items" bson:"items"`

	GrandTotal float64 `json:"grand_total" bson:"grand_total"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
