package estimate

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/estimate/model"
)

type CreateEstimateDTO struct {
	Date                  string              `json:"date" binding:"required"`
	Logo                  string              `json:"logo" binding:"required"`
	Status                string              `json:"status" binding:"required"`
	ProviderName          string              `json:"providerName" binding:"required"`
	ProviderAddress       string              `json:"providerAddress" binding:"required"`
	ClientName            string              `json:"clientName" binding:"required"`
	ClientAddress         string              `json:"clientAddress" binding:"required"`
	ScopeOfServices       string              `json:"scopeOfServices"`
	AdvancePaymentPercent float64             `json:"advancePaymentPercent"`
	BalancePaymentPercent float64             `json:"balancePaymentPercent"`
	DiscountPercentage    float64             `json:"discountPercentage"`
	GSTPercentage         float64             `json:"gstPercentage"`
	AdjustmentLabel       string              `json:"adjustmentLabel"`
	AdjustmentAmount      float64             `json:"adjustmentAmount"`
	Items                 []model.ReceiptItem `json:"items"`
}
