package UserManagement

type CreateUserManagementDTO struct {
	Name string `json:"name" binding:"required"`
}