package dto

type CreateReminderDTO struct {
	CRMID string `json:"crm_id"`

	ReminderTitle string `json:"reminder_title" validate:"required"`

	ReminderDate string `json:"reminder_date" validate:"required"`

	ReminderTime string `json:"reminder_time" validate:"required"`
}
