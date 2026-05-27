package handler

import (
	"net/http"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/model"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/service"

	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
	service *service.CommentService
}

func NewCommentHandler(service *service.CommentService) *CommentHandler {
	return &CommentHandler{
		service: service,
	}
}

func (h *CommentHandler) AddComment(c *gin.Context) {

	var data model.Comment

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.service.AddComment(data)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Comment Added Successfully",
	})
}

func (h *CommentHandler) GetAllComments(c *gin.Context) {

	data, err := h.service.GetAllComments()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
