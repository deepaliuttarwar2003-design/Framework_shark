package dto

type CreateProposalRequest struct {
	ProposalTitle       string `json:"proposal_title"`
	ProposalType        string `json:"proposal_type"`
	ClientName          string `json:"client_name"`
	ContactPerson       string `json:"contact_person"`
	Email               string `json:"email"`
	MobileNumber        string `json:"mobile_number"`
	LeadReference       string `json:"lead_reference"`
	SalesRepresentative string `json:"sales_representative"`

	Currency    string  `json:"currency"`
	Subtotal    float64 `json:"subtotal"`
	Discount    float64 `json:"discount"`
	Tax         float64 `json:"tax"`
	TotalAmount float64 `json:"total_amount"`

	Description     string `json:"description"`
	TermsConditions string `json:"terms_conditions"`
	Notes           string `json:"notes"`
}

type UpdateProposalRequest struct {
	CreateProposalRequest
	Status string `json:"status"`
}