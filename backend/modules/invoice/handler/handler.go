package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/service"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAll(c *gin.Context) {

	data, err := h.service.GetAll()
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

	var input dto.CreateInvoiceDTO

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

// update

func (h *Handler) Update(c *gin.Context) {
    id := c.Param("id")
    
    var req dto.CreateInvoiceDTO
    
    // Use ShouldBindJSON with proper error handling
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{
            "error": err.Error(),
            "receivedBody": c.Request.Body, 
        })
        return
    }
    
    // Validate the DTO
    // if err := validate.Struct(req); err != nil {
    //     c.JSON(400, gin.H{"error": err.Error()})
    //     return
    // }
    
    // Call your service
    result, err := h.service.Update(id, req)
    if err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(200, result)
}

// delete

func (h *Handler) Delete(c *gin.Context) {
	id := c.Param("id")

	err := h.service.Delete(id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "invoice not found",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "invoice deleted successfully",
	})
}
