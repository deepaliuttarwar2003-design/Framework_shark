package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/service"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/dto"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAll(c *gin.Context) {

	data,err := h.service.GetAll()

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

func (h *Handler) Create(c *gin.Context) {

	var input dto.CreateInventoryDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	result, err := h.service.Create(input)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, result)
}

// UPDATE

func (h *Handler) Update(c *gin.Context){
	id := c.Param("id")

	var input dto.CreateInventoryDTO

	if err := c.ShouldBindJSON(&input); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error" : err.Error(),
		})
		return
	}

	result, err := h.service.Update(id, input)
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{
			"error" : err.Error(),
		})
		return
	}

	if result == nil{
		c.JSON(http.StatusNotFound, gin.H{
			"error": "not found",
		})
		return
	}

	c.JSON(http.StatusOK, result)

}

// DELETE

func (h *Handler) Delete(c *gin.Context){
	id := c.Param("id")

	err := h.service.Delete(id)
	if err != nil{
		c.JSON(http.StatusNotFound,gin.H{
			"error" : "not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":"Account deleted successfully",
	})
}