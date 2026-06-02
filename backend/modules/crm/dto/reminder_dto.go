package dto

type CreateReminderDTO struct {
	CRMID string `json:"crm_id"`

	Title string `json:"text"`

	Date string `json:"date"`

	Time string `json:"time"`
}