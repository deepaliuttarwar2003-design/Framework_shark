package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	// "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/response"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	authmiddleware "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/middleware"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateLogin(c *gin.Context) {

	var input dto.LoginAuthDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	result, err := h.service.CreateLogin(input)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	maxAge := int(result.ExpiresAt.Sub(time.Now()).Seconds())
	if maxAge < 0 {
		maxAge = 0
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "token",
		Value:    result.Token,
		Path:     "/",
		Domain:   "localhost",
		Expires:  result.ExpiresAt,
		MaxAge:   maxAge,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteNoneMode,
	})

	c.JSON(http.StatusOK, result)
}

func (h *Handler) CreateRegister(c *gin.Context) {

	var input dto.RegisterAuthDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	result, err := h.service.CreateRegister(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, result)
}

func (h *Handler) Me(c *gin.Context) {
	claims, ok := authmiddleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": claims,
	})
}

func (h *Handler) Logout(c *gin.Context) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		Domain:   "localhost",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteNoneMode,
	})

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Logged out successfully",
	})
}
