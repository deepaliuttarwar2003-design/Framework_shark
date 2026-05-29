package dto

type CreateReminderDTO struct {
	CRMID string `json:"crm_id"`

	Title string `json:"title"`

	Date string `json:"date"`

	Time string `json:"time"`
}