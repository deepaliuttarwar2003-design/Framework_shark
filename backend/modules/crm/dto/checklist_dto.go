package dto

type CreateChecklistDTO struct {
	CRMID string `json:"crm_id"`

	Title     string `json:"title"`
	IsChecked bool   `json:"is_checked"`
}
