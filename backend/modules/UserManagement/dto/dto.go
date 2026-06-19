package UserManagement

type CreateUserManagementDTO struct {
	FirstName string    `json:"firstName" binding:"required"`
	LastName  string    `json:"lastName" binding:"required"`
	Email     string    `json:"email" gorm:"unique" binding:"required"`
	Phone     string    `json:"phone" binding:"required"`
	Role      string    `json:"role" binding:"required"`   // Admin, Manager, User
	Status    string    `json:"status" binding:"required"` // active, inactive
	Password  string    `json:"password" binding:"required"`      // hashed password
	Avatar    string    `json:"avatar" binding:"required"` // profile image url
	Address   string    `json:"address" binding:"required"`
	
}
