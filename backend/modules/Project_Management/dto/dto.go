package Project_Management

type CreateProjectManagementDTO struct {
	Name string `json:"name" binding:"required"`
}