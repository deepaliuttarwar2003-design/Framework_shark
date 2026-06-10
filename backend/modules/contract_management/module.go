package contract_management

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contract_management/service"
)

type Module struct {
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "contract_management"
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	fmt.Println(">>> Contract Init called")

	repo := repository.NewRepository(ctx.DB)
	svc := service.NewService(repo)

	m.handler = handler.NewHandler(svc)

	return nil
}

func (m *Module) RegisterRoutes(rg *gin.RouterGroup) {
	fmt.Println(">>> Contract routes registered")

	contracts := rg.Group("/contract_management")
	{
		contracts.POST("/createcontracts", m.handler.Create)
		contracts.GET("/getallcontracts", m.handler.GetAll)
		contracts.GET("/getcontractsby/:id", m.handler.GetByID)
		contracts.PUT("/updatecontracts/:id", m.handler.Update)
		contracts.DELETE("/deletecontracts/:id", m.handler.Delete)
	}
}