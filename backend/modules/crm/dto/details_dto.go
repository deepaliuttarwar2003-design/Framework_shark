package dto

type CreateDetailDTO struct {
	CRMID string `json:"lead_id"`

	Description string `json:"description"`
	Status      string `json:"status"`
	Priority    string `json:"priority"`
}
