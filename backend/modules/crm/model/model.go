
package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Crm struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id"`

	LeadTitle string `bson:"lead_title" json:"lead_title"`
	FirstName string `bson:"first_name" json:"first_name"`
	LastName  string `bson:"last_name" json:"last_name"`
	Telephone string `bson:"telephone" json:"telephone"`
	Email     string `bson:"email" json:"email"`

	LeadValue     float64  `bson:"lead_value" json:"lead_value"`
	Notes         string   `bson:"notes" json:"notes"`
	Source        string   `bson:"source" json:"source"`
	Category      string   `bson:"category" json:"category"`
	Tags          []string `bson:"tags" json:"tags"`
	LastContacted string   `bson:"last_contacted" json:"last_contacted"`

	CompanyName string `bson:"company_name" json:"company_name"`
	Street      string `bson:"street" json:"street"`
	City        string `bson:"city" json:"city"`
	State       string `bson:"state" json:"state"`
	ZipCode     string `bson:"zip_code" json:"zip_code"`
	Country     string `bson:"country" json:"country"`
	Website     string `bson:"website" json:"website"`
	Stage     string `bson:"stage" json:"stage"`
}
