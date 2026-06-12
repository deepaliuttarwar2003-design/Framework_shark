package handler

import (
	"fmt"
	"io"
	"net/http"

	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/dto"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/auth/service"

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

// ==================== REGISTER ====================

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

// ==================== LOGIN ====================
func (h *Handler) Loginuser(c *gin.Context) {

	fmt.Println("===== LOGIN HANDLER START =====")

	var input dto.LoginDTO

	if err := c.ShouldBindJSON(&input); err != nil {

		fmt.Println("JSON Binding Error:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("Login Request Received")
	fmt.Println("Email:", input.Email)

	result, err := h.service.Login(input)

	if err != nil {

		fmt.Println("Login Service Error:", err)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("Login Service Success")
	fmt.Println("Result:", result)

	c.JSON(http.StatusOK, gin.H{
		"message": "User Logged In Successfully",
		"data":    result,
	})

	fmt.Println("Response Sent Successfully")
}

// ==================== PROFILE ====================

func (h *Handler) GetProfile(c *gin.Context) {

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(401, gin.H{
			"error": "user id not found",
		})
		return
	}

	fmt.Println("User ID from Context:", userID)

	profile, err := h.service.GetProfile(userID.(string))
	if err != nil {
		c.JSON(401, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"data": profile,
	})
}

// ==================== LOGOUT ====================

func (h *Handler) Logout(c *gin.Context) {

	c.SetCookie(
		"access_token",
		"",
		-1,
		"/",
		"",
		false,
		true,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged Out Successfully",
	})
}

// ==================== DEBUG ====================

func (h *Handler) DebugBody(c *gin.Context) {

	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("RAW BODY:", string(body))

	c.JSON(http.StatusOK, gin.H{
		"body": string(body),
	})
}
