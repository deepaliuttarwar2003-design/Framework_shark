package contract_management

type ContractItemDTO struct {
    Description string  `json:"description"`
    Qty         float64 `json:"qty"`
    Unit        string  `json:"unit"`
    Rate        float64 `json:"rate"`
    Total       float64 `json:"total"`
}

type CreateContractManagementDTO struct {
    ContractNo   string          `json:"contract_no" binding:"required"`
    Title        string          `json:"title" binding:"required"`
    PartyName    string          `json:"party_name" binding:"required"`
    StartDate    string          `json:"start_date" binding:"required"`
    EndDate      string          `json:"end_date" binding:"required"`
    Status       string          `json:"status" binding:"required"`
    TemplateID   string          `json:"template_id" binding:"required"`
    Items        []ContractItemDTO `json:"items"`
    Discount     float64         `json:"discount"`
    Gst          float64         `json:"gst"`
    Description  string          `json:"description"`
    Notes        string          `json:"notes"`
    PaymentTerms string          `json:"payment_terms"`
    RenewalDate  string          `json:"renewal_date"`
}

type UpdateContractManagementDTO struct {
    ContractNo   string          `json:"contract_no"`
    Title        string          `json:"title"`
    PartyName    string          `json:"party_name"`
    StartDate    string          `json:"start_date"`
    EndDate      string          `json:"end_date"`
    Status       string          `json:"status"`
    TemplateID   string          `json:"template_id"`
    Items        []ContractItemDTO `json:"items"`
    Discount     float64         `json:"discount"`
    Gst          float64         `json:"gst"`
    Description  string          `json:"description"`
    Notes        string          `json:"notes"`
    PaymentTerms string          `json:"payment_terms"`
    RenewalDate  string          `json:"renewal_date"`
}
