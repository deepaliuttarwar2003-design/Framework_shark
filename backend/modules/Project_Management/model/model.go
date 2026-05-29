package Project_Management

import "go.mongodb.org/mongo-driver/bson/primitive"

type ProjectManagement struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	ProjectTitle     string             `json:"projectTitle" `
	Description      string             `json:"description" `
	Client           string             `json:"client" `
	Manager          string             `json:"manager" `
	DateOfAssign     string             `json:"dateOfAssign" `
	DateOfCompletion string             `json:"dateOfCompletion" `
	Budget           float64            `json:"budget" `
	Status           string             `json:"status" `
}
