package dto

type CreateCommentDTO struct {
	CRMID   string `json:"lead_id"`
	Message string `json:"text"`
	Author  string `json:"author"`
}
