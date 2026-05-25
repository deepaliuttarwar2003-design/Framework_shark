package dto

type PurchaseOrderItemRequest struct {
	ProductName string  `json:"product_name"`
	Quantity    int     `json:"quantity"`
	Price       float64 `json:"price"`
	Total       float64 `json:"total"`
}

type CreatePurchaseOrderRequest struct {
	SupplierName    string `json:"supplier_name"`
	CompanyName     string `json:"company_name"`
	SupplierContact string `json:"supplier_contact"`
	SupplierAddress string `json:"supplier_address"`
	GSTIN           string `json:"gstin"`
	Status          string `json:"status"`

	Items []PurchaseOrderItemRequest `json:"items"`
}
