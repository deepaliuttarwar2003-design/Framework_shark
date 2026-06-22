package dto

type CreateTeamRequest struct {
	TeamName     string `json:"team_name"`
	Description  string `json:"description"`
	TeamRole     string `json:"team_role"`
	TotalMembers int    `json:"total_members"`
	IsActive     bool   `json:"is_active"`
}

type UpdateTeamRequest struct {
	TeamName     string `json:"team_name"`
	Description  string `json:"description"`
	TeamRole     string `json:"team_role"`
	TotalMembers int    `json:"total_members"`
	IsActive     bool   `json:"is_active"`
}