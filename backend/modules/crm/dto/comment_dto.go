package dto

type CreateCommentDTO struct {
	CRMID string `json:"crm_id"`

	Message string `json:"message" validate:"required"`

	Author string `json:"author" validate:"required"`
}
