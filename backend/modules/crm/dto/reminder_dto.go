package dto

type CreateReminderDTO struct {
	CRMID string `json:"lead_id"`

	ReminderTitle string `json:"text" validate:"required"`

	ReminderDate string `json:"date" validate:"required"`

	ReminderTime string `json:"time" validate:"required"`
}
