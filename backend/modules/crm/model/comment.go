package model

type Comment struct {
	CRMID   string `bson:"crm_id" json:"crm_id"`
	Message string `bson:"message" json:"message"`
	Author  string `bson:"author" json:"author"`
}
