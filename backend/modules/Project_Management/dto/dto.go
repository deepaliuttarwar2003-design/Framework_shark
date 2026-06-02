package Project_Management



type CreateProjectManagementDTO struct {
	
	ProjectTitle     string  `json:"projectName" binding:"required"`
	Description      string  `json:"description" binding:"required"`
	Client           string  `json:"clientName" binding:"required"`
	Manager          string  `json:"teamLead" binding:"required"`
	DateOfAssign     string  `json:"startDate" binding:"required"`
	DateOfCompletion string  `json:"endDate" binding:"required"`
	Budget           float64 `json:"budget"`
	Status           string  `json:"status" binding:"required"`
	Priority         string  `json:"priority"`
}



