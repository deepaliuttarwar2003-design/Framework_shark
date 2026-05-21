package crm

type CreateCrmDTO struct {
	Name string `json:"name" binding:"required"`
}