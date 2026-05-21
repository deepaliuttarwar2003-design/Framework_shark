package dto

type CreateDetailDTO struct {
	CRMID string `json:"crm_id"`

	Description string `json:"description"`
	Status      string `json:"status"`
	Priority    string `json:"priority"`
}
