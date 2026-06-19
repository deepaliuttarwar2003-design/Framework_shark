package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Proposal struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	ProposalID    string    `bson:"proposal_id" json:"proposal_id"`
	ProposalTitle string    `bson:"proposal_title" json:"proposal_title"`
	ProposalDate  time.Time `bson:"proposal_date" json:"proposal_date"`
	ExpiryDate    time.Time `bson:"expiry_date" json:"expiry_date"`

	ProposalType string `bson:"proposal_type" json:"proposal_type"`
	Status       string `bson:"status" json:"status"`

	ClientName    string `bson:"client_name" json:"client_name"`
	ContactPerson string `bson:"contact_person" json:"contact_person"`
	Email         string `bson:"email" json:"email"`
	MobileNumber  string `bson:"mobile_number" json:"mobile_number"`

	LeadReference       string `bson:"lead_reference" json:"lead_reference"`
	SalesRepresentative string `bson:"sales_representative" json:"sales_representative"`

	Currency    string  `bson:"currency" json:"currency"`
	Subtotal    float64 `bson:"subtotal" json:"subtotal"`
	Discount    float64 `bson:"discount" json:"discount"`
	Tax         float64 `bson:"tax" json:"tax"`
	TotalAmount float64 `bson:"total_amount" json:"total_amount"`

	Description     string `bson:"description" json:"description"`
	TermsConditions string `bson:"terms_conditions" json:"terms_conditions"`
	Notes           string `bson:"notes" json:"notes"`

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
