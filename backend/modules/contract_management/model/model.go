package model

import "time"

type ContractItem struct {
	Description string  `bson:"description" json:"description"`
	Qty         int     `bson:"qty" json:"qty"`
	Unit        string  `bson:"unit" json:"unit"`
	Rate        float64 `bson:"rate" json:"rate"`
	Total       float64 `bson:"total" json:"total"`
}

type ContractManagements struct {
	ID string `bson:"id,omitempty" json:"id"`

	ContractNo string `bson:"contract_no" json:"contract_no"`
	Title      string `bson:"title" json:"title"`
	PartyName  string `bson:"party_name" json:"party_name"`

	StartDate time.Time `bson:"start_date" json:"start_date"`
	EndDate   time.Time `bson:"end_date" json:"end_date"`

	Status string `bson:"status" json:"status"`

	TemplateID string `bson:"template_id" json:"template_id"`

	Items []ContractItem `bson:"items" json:"items"`

	Discount float64 `bson:"discount" json:"discount"`
	GST      float64 `bson:"gst" json:"gst"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
