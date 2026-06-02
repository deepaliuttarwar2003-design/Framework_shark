package contract_management

type CreateContractManagementDTO struct {
	Name string `json:"name" binding:"required"`
}