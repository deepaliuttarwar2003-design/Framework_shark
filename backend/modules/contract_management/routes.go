package contract_management

import (
    "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/handler"
    "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/service"
    "github.com/gin-gonic/gin"
)

func RegisterContractManagementRoutes(r *gin.RouterGroup) {
    h := handler.NewHandler(service.NewService())

    r.GET("/contracts", h.GetAll)
    r.GET("/contracts/:id", h.GetByID)
    r.POST("/contracts", h.Create)
    r.PUT("/contracts/:id", h.Update)
    r.DELETE("/contracts/:id", h.Delete)
}
