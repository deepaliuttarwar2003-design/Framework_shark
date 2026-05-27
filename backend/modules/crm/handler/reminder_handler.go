package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)

type ReminderHandler struct {
	service *service.ReminderService
}

func NewReminderHandler(service *service.ReminderService) *ReminderHandler {
	return &ReminderHandler{
		service: service,
	}
}

func (h *ReminderHandler) AddReminder(c *gin.Context) {

	var data model.Reminder

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.AddReminder(data)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Reminder Added Successfully",
	})
}

func (h *ReminderHandler) GetAllReminders(c *gin.Context) {

	data, err := h.service.GetAllReminders()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
