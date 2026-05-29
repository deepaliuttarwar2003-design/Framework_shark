package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)

type ChecklistHandler struct {
	service *service.ChecklistService
}

func NewChecklistHandler(service *service.ChecklistService) *ChecklistHandler {
	return &ChecklistHandler{
		service: service,
	}
}

func (h *ChecklistHandler) AddChecklist(c *gin.Context) {

	var data model.Checklist

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.AddChecklist(data)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Checklist Added Successfully",
	})
}

func (h *ChecklistHandler) GetAllChecklist(c *gin.Context) {

	data, err := h.service.GetAllChecklist()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
