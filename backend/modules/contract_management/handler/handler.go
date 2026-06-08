package handler

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/model"
    "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/service"
)

type Handler struct {
    service *service.Service
}

func NewHandler(service *service.Service) *Handler {
    return &Handler{service: service}
}

func (h *Handler) GetAll(c *gin.Context) {
    data := h.service.GetAll()
    c.JSON(http.StatusOK, gin.H{"data": data})
}

func (h *Handler) GetByID(c *gin.Context) {
    id := c.Param("id")
    contract, found := h.service.FindByID(id)
    if !found {
        c.JSON(http.StatusNotFound, gin.H{"error": "contract not found"})
        return
    }
    c.JSON(http.StatusOK, contract)
}

func (h *Handler) Create(c *gin.Context) {
    var input model.ContractManagement
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result := h.service.Create(input)
    c.JSON(http.StatusOK, result)
}

func (h *Handler) Update(c *gin.Context) {
    id := c.Param("id")
    var input model.ContractManagement
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result, ok := h.service.Update(id, input)
    if !ok {
        c.JSON(http.StatusNotFound, gin.H{"error": "contract not found"})
        return
    }

    c.JSON(http.StatusOK, result)
}

func (h *Handler) Delete(c *gin.Context) {
    id := c.Param("id")
    if !h.service.Delete(id) {
        c.JSON(http.StatusNotFound, gin.H{"error": "contract not found"})
        return
    }
    c.Status(http.StatusNoContent)
}
