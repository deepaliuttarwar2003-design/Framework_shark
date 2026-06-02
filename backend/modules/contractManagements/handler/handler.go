package handler

import (
	"net/http"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/service"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) Create(c *gin.Context) {

	var req dto.CreateContractRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.Create(c.Request.Context(), &req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "contract created successfully",
	})
}

func (h *Handler) GetAll(c *gin.Context) {

	contracts, err := h.service.GetAll(c.Request.Context())

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, contracts)
}

func (h *Handler) GetByID(c *gin.Context) {

	id := c.Param("id")

	data, err := h.service.GetByID(
		c.Request.Context(),
		id,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}

func (h *Handler) Update(c *gin.Context) {

	id := c.Param("id")

	var req dto.UpdateContractRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.Update(
		c.Request.Context(),
		id,
		&req,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "contract updated successfully",
	})
}

func (h *Handler) Delete(c *gin.Context) {

	id := c.Param("id")

	err := h.service.Delete(
		c.Request.Context(),
		id,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "contract deleted successfully",
	})
}
