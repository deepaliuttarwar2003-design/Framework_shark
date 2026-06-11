package Porposal

type CreatePorposalDTO struct {
	Name string `json:"name" binding:"required"`
}