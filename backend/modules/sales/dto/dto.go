package dto

import "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/model"

type CreateSalesRequest struct {
	
	CustomerName    string            `json:"customerName"`
	CustomerContact string            `json:"customerContact"`
	CustomerAddress string            `json:"customerAddress"`
	GSTIN           string            `json:"gstin"`
	Items           []model.SalesItem `json:"items"`
	SubTotal        float64           `json:"subtotal"`
	GrandTotal      float64           `json:"grand_total"`
	PaymentMethod   string            `json:"payment_method"`
	PaymentStatus   string            `json:"payment_status"`

}

type UpdateSalesRequest struct {
	
	CustomerName    string            `json:"customer_name"`
	CustomerContact string            `json:"customer_contact"`
	CustomerAddress string            `json:"customer_address"`
	GSTIN           string            `json:"gstin"`
	Items           []model.SalesItem `json:"items"`
	SubTotal        float64           `json:"subtotal"`
	GrandTotal      float64           `json:"grand_total"`
	PaymentMethod   string            `json:"payment_method"`
	PaymentStatus   string            `json:"payment_status"`
}
