package contract

type CreateContractDTO struct {
	Name string `json:"name" binding:"required"`
}