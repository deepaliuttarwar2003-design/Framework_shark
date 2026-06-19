package UserManagement

import (
	"time"
)

type UserManagement struct {
	ID        string    `json:"id"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email" gorm:"unique"`
	Phone     string    `json:"phone"`
	Role      string    `json:"role"`   // Admin, Manager, User
	Status    string    `json:"status"` // active, inactive
	Password  string    `json:"password"`      // hashed password
	Avatar    string    `json:"avatar"` // profile image url
	Address   string    `json:"address"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
