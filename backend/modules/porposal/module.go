package porposal

import (
	"github.com/gin-gonic/gin"

	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/porposal/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/porposal/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/porposal/service"
)

const ModuleName = "porposal"

type Module struct {
	handler *handler.Handler
}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {

	repo := repository.NewRepository(ctx.DB)
	service := service.NewService(repo)
	m.handler = handler.NewHandler(service)
	// handler := handler.NewHandler(service)

	return nil
}
func (m *Module) RegisterRoutes(r *gin.RouterGroup) {

	r.POST("/create", m.handler.Create)
	r.GET("/getallporposal", m.handler.GetAll)
	r.GET("/getallporposal/:id", m.handler.GetByID)
	r.PUT("/put/porposal/:id", m.handler.Update)
	r.DELETE("/delete/porposal/:id", m.handler.Delete)
}

var _ module.Module = (*Module)(nil)
