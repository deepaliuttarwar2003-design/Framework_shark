package handler

import(
	"net/http"

	"github.com/gin-gonic/gin"

	service "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/service"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/inventory/dto"
)

type CategoryHandler struct{
	service *service.CategoryService
}

func NewCategoryHandler(
	service *service.CategoryService,
)*CategoryHandler{
	return &CategoryHandler{
		service : service,
	}
}

func (h *CategoryHandler) GetAllCategory(c *gin.Context) {
	data, err := h.service.GetAllCategory()

	if err != nil{
		c.JSON(http.StatusInternalServerError,gin.H{
			"error" : err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func (h *CategoryHandler) CreateCategory(c *gin.Context) {

	var input dto.CreateCategoryDTO

	if err := c.ShouldBindJSON(&input); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	result, err := h.service.CreateCategory(input)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "category created",
		"data": result,
	})
}

// update

func (h *CategoryHandler) UpdateCategory(c *gin.Context) {

	id := c.Param("id")

	var input dto.CreateCategoryDTO

	if err := c.ShouldBindJSON(&input); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	result, err := h.service.UpdateCategory(id, input)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "category updated",
		"data": result,
	})
}


// delete
func (h *CategoryHandler) DeleteCategory(c *gin.Context) {

	id := c.Param("id")

	err := h.service.DeleteCategory(id)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "category deleted successfully",
	})
}