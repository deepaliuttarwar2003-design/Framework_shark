package invoice

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/invoice/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "invoice"

type Module struct {
	service *service.Service
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	m.service = service.NewService(ctx.DB)
	m.handler = handler.NewHandler(m.service)
	return nil
}

func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	r.POST("/invoice/createInvoice", m.handler.Create)
	r.GET("/invoice/getInvoice", m.handler.GetAll)
	r.PUT("/updateInvoice/:id", m.handler.Update)
	r.DELETE("/deleteInvoice/:id", m.handler.Delete)
}

// compile-time safety
var _ module.Module = (*Module)(nil)
