package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/service"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/dto"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAll(c *gin.Context) {

	data := h.service.GetAll()

	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func (h *Handler) Create(c *gin.Context) {

	var input dto.CreateContractManagementDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	result := h.service.Create(input)

	c.JSON(http.StatusOK, result)
}