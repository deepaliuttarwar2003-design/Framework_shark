package dto

type CreateChecklistDTO struct {
	CRMID string `json:"lead_id"`

	Title     string `json:"text"`
	IsChecked bool   `json:"is_checked"`
}
