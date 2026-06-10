package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) Register(c *gin.Context) {

	var input dto.RegisterDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	result, err := h.service.Register(input)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User Registered Successfully",
		"data":    result,
	})
}

func (h *Handler) Login(c *gin.Context) {

	var input dto.LoginDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	user, err := h.service.Login(input)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login Successful",
		"user":    user,
	})
}
