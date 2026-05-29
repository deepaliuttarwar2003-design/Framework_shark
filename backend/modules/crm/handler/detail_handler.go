package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)

type DetailHandler struct {
	service *service.DetailService
}

func NewDetailHandler(service *service.DetailService) *DetailHandler {
	return &DetailHandler{
		service: service,
	}
}

func (h *DetailHandler) AddDetail(c *gin.Context) {

	var data model.Detail

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.AddDetail(data)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Detail Added Successfully",
	})
}

func (h *DetailHandler) GetDetail(c *gin.Context) {

	data, err := h.service.GetDetail()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
