package contractManagements

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/contractManagements/service"
)

type Module struct {
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return "contractManagements"
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	fmt.Println(">>> Contract Init called")

	repo := repository.NewRepository(ctx.DB)
	svc := service.NewService(repo)

	m.handler = handler.NewHandler(svc)

	return nil
}

func (m *Module) RegisterRoutes(rg *gin.RouterGroup) {

	contracts := rg.Group("/contract_management")
	{
		contracts.POST("/createcontracts", m.handler.Create)

		contracts.GET("/getallcontracts", m.handler.GetAll)

		contracts.GET("/getcontractsby/:id", m.handler.GetByID)

		contracts.PUT("/updatecontracts/:id", m.handler.Update)

		contracts.DELETE("/deletecontracts/:id", m.handler.Delete)
	}
}
