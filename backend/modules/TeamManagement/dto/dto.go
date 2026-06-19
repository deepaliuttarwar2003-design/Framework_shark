package TeamManagement

type CreateTeamManagementDTO struct {
	Name string `json:"name" binding:"required"`
}