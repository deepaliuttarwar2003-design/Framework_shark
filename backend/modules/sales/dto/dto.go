package dto

import "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/sales/model"

type CreateSalesRequest struct {
	InvoiceNo       string            `json:"invoice_no"`
	CustomerName    string            `json:"customer_name"`
	CompanyName     string            `json:"company_name"`
	CustomerContact string            `json:"customer_contact"`
	CustomerAddress string            `json:"customer_address"`
	GSTIN           string            `json:"gstin"`
	Items           []model.SalesItem `json:"items"`
	SubTotal        float64           `json:"subtotal"`
	GST             float64           `json:"gst"`
	Discount        float64           `json:"discount"`
	GrandTotal      float64           `json:"grand_total"`
	PaymentMethod   string            `json:"payment_method"`
	PaymentStatus   string            `json:"payment_status"`
	SalesStatus     string            `json:"sales_status"`
	InvoiceFile     string            `json:"invoice_file"`
}
