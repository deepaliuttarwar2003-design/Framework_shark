package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
	"github.com/gin-gonic/gin"
)

func (h *Handler) AddDetail(c *gin.Context) {

	var req dto.CreateDetailDTO

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := h.service.AddDetail(req)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Detail added successfully",
	})
}

func (h *Handler) GetAllDetails(c *gin.Context) {

	data, err := h.service.GetDetail()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}
