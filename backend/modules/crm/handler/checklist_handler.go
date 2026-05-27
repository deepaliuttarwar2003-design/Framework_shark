// package handler

// import (
// 	"net/http"

// 	"github.com/gin-gonic/gin"

// 	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
// )

// //
// // ADD CHECKLIST
// //
// func (h *Handler) AddChecklist(c *gin.Context) {

// 	var req dto.CreateChecklistDTO

// 	// Bind JSON request
// 	if err := c.ShouldBindJSON(&req); err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{
// 			"error": err.Error(),
// 		})

// 		return
// 	}

// 	// Call service
// 	err := h.service.AddChecklist(req)

// 	if err != nil {

// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error": err.Error(),
// 		})

// 		return
// 	}

// 	// Success response
// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Checklist added successfully",
// 	})
// }


// // GET ALL CHECKLISTS

// func (h *Handler) GetChecklists(c *gin.Context) {

// 	checklists, err := h.service.GetChecklists()

// 	if err != nil {

// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error": err.Error(),
// 		})

// 		return
// 	}

// 	c.JSON(http.StatusOK, checklists)
// }


package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/crm/dto"
)

func (h *Handler) AddChecklist(c *gin.Context) {

	var req dto.CreateChecklistDTO

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := h.service.AddChecklist(req)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Checklist added successfully",
	})
}

func (h *Handler) GetAllChecklist(c *gin.Context) {

	data, err := h.service.GetAllChecklist()

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