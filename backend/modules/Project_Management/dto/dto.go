package Project_Management



type CreateProjectManagementDTO struct {
	ProjectTitle     string    `json:"projectTitle" binding:"required"`
	Description      string    `json:"description" binding:"required"`
	Client           string    `json:"client" binding:"required"`
	Manager          string    `json:"manager" binding:"required"`
	DateOfAssign     string `json:"dateOfAssign" binding:"required"`
	DateOfCompletion string `json:"dateOfCompletion" binding:"required"`
	Budget           float64   `json:"budget" binding:"required"`
	Status           string    `json:"status" binding:"required"`
}
