package dto

type CreateCommentDTO struct {
	CRMID   string `json:"crm_id"`
	Message string `json:"message"`
	Author  string `json:"author"`
}
