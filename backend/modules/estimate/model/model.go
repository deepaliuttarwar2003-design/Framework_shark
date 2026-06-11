package estimate

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReceiptItem struct {
	ID          string  `json:"id" bson:"id"`
	Description string  `json:"description" bson:"description"`
	Qty         int     `json:"qty" bson:"qty"`
	Unit        string  `json:"unit" bson:"unit"`
	Rate        float64 `json:"rate" bson:"rate"`
}

type Estimate struct {
    ID   primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Date   time.Time `bson:"date" json:"date"`
	Status string    `bson:"status" json:"status"`
	Logo   string    `bson:"logo" json:"logo"`

	ProviderName    string `bson:"providerName" json:"providerName"`
	ProviderAddress string `bson:"providerAddress" json:"providerAddress"`

	ClientName    string `bson:"clientName" json:"clientName"`
	ClientAddress string `bson:"clientAddress" json:"clientAddress"`

	ScopeOfServices string `bson:"scopeOfServices" json:"scopeOfServices"`

	AdvancePaymentPercent float64 `bson:"advancePaymentPercent" json:"advancePaymentPercent"`
	BalancePaymentPercent float64 `bson:"balancePaymentPercent" json:"balancePaymentPercent"`

	DiscountPercentage float64 `bson:"discountPercentage" json:"discountPercentage"`
	GSTPercentage      float64 `bson:"gstPercentage" json:"gstPercentage"`

	AdjustmentLabel  string  `bson:"adjustmentLabel" json:"adjustmentLabel"`
	AdjustmentAmount float64 `bson:"adjustmentAmount" json:"adjustmentAmount"`

	Items []ReceiptItem `bson:"items" json:"items"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt" json:"updatedAt"`
}
