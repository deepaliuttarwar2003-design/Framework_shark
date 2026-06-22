package model

import "time"

type Team struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	TeamName     string    `json:"team_name"`
	Description  string    `json:"description"`
	TeamRole     string    `json:"team_role"`
	TotalMembers int       `json:"total_members"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
