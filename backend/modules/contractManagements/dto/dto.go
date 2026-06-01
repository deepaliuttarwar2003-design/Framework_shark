package contractmanagement

import "time"

type ContractItemRequest struct {
	Description string  `json:"description"`
	Qty         int     `json:"qty"`
	Unit        string  `json:"unit"`
	Rate        float64 `json:"rate"`
}

type CreateContractRequest struct {
	ContractNo string `json:"contract_no"`
	Title      string `json:"title"`
	PartyName  string `json:"party_name"`

	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`

	Status string `json:"status"`

	TemplateID string `json:"template_id"`

	Items []ContractItemRequest `json:"items"`

	Discount float64 `json:"discount"`
	GST      float64 `json:"gst"`
}

type UpdateContractRequest struct {
	ContractNo string `json:"contract_no"`
	Title      string `json:"title"`
	PartyName  string `json:"party_name"`

	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`

	Status string `json:"status"`

	Discount float64 `json:"discount"`
	GST      float64 `json:"gst"`
}
