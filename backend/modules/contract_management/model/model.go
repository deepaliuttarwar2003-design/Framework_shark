package contract_management

type ContractItem struct {
    Description string  `json:"description"`
    Qty         float64 `json:"qty"`
    Unit        string  `json:"unit"`
    Rate        float64 `json:"rate"`
    Total       float64 `json:"total"`
}

type ContractManagement struct {
    ID           string         `json:"id"`
    ContractNo   string         `json:"contract_no"`
    Title        string         `json:"title"`
    PartyName    string         `json:"party_name"`
    StartDate    string         `json:"start_date"`
    EndDate      string         `json:"end_date"`
    Status       string         `json:"status"`
    TemplateID   string         `json:"template_id"`
    Items        []ContractItem `json:"items"`
    Discount     float64        `json:"discount"`
    Gst          float64        `json:"gst"`
    Subtotal     float64        `json:"subtotal,omitempty"`
    TaxAmount    float64        `json:"tax_amount,omitempty"`
    GrandTotal   float64        `json:"grand_total,omitempty"`
    Description  string         `json:"description,omitempty"`
    Notes        string         `json:"notes,omitempty"`
    PaymentTerms string         `json:"payment_terms,omitempty"`
    RenewalDate  string         `json:"renewal_date,omitempty"`
    CreatedAt    string         `json:"created_at,omitempty"`
    UpdatedAt    string         `json:"updated_at,omitempty"`
}
