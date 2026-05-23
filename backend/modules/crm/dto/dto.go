
package dto

type CreateCrmDTO struct {
	LeadTitle     string   `json:"lead_title"`
	FirstName     string   `json:"first_name" validate:"required"`
	LastName      string   `json:"last_name" validate:"required"`
	Telephone     string   `json:"telephone" validate:"required"`
	Email         string   `json:"email" validate:"required,email"`
	LeadValue     float64  `json:"lead_value"`
	Notes         string   `json:"notes"`
	Source        string   `json:"source"`
	Category      string   `json:"category"`
	Tags          []string `json:"tags"`
	LastContacted string   `json:"last_contacted"`
	CompanyName   string   `json:"company_name"`
	Street        string   `json:"street"`
	City          string   `json:"city"`
	State         string   `json:"state"`
	ZipCode       string   `json:"zip_code"`
	Country       string   `json:"country"`
	Website       string   `json:"website"`
	Stage         string   `bson:"stage" json:"stage"`
}

