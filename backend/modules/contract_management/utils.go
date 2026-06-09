package contract_management

import "github.com/google/uuid"

func GenerateID() string {
	return uuid.New().String()
}