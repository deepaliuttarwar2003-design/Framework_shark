package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/purchase_order/service"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *service.PurchaseOrderService
}

func NewPurchaseOrderHandler(
	service *service.PurchaseOrderService,
) *Handler {

	return &Handler{
		service: service,
	}
}

func (h *Handler) Create(c *gin.Context) {

	var req dto.CreatePurchaseOrderRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	result, err := h.service.Create(req)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, result)
}

func (h *Handler) GetAll(c *gin.Context) {

	result, err := h.service.GetAll()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, result)
}
