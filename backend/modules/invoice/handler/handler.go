package handler

import (
	"net/http"
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/model"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/service"
	dto "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/dto"
	"time"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetAll(c *gin.Context) {

	data := h.service.GetAll()

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

	var subtotal float64

	var items []model.InvoiceItem

	for _, item := range input.Items {

		price := 1000.0 // Fetch from product table

		amount := price * float64(item.Quantity)

		subtotal += amount

		items = append(items, model.InvoiceItem{
			ProductID: item.ProductID,
			Quantity:  item.Quantity,
			Price:     price,
			Amount:    amount,
		})
	}

	tax := subtotal * 0.18
	total := subtotal + tax

	invoice := model.Invoice{
		InvoiceNo:   "INV-001",
		CustomerID:  input.CustomerID,
		InvoiceDate: time.Now().Format("2006-01-02"),
		DueDate:     input.DueDate,
		Subtotal:    subtotal,
		Tax:         tax,
		TotalAmount: total,
		Status:      "Pending",
		Items:       items,
	}

	// db.Create(&invoice)

	c.JSON(http.StatusCreated, invoice)
}