package businesspurposal

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/businesspurposal/handler"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/businesspurposal/repository"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/businesspurposal/service"
	"github.com/gin-gonic/gin"
)

const ModuleName = "businesspurposal"

type Module struct{}

func NewModule() *Module {
	return &Module{}
}

func (m *Module) Name() string {
	return ModuleName
}

func (m *Module) Init(ctx *module.ModuleContext) error {
	return nil
}

func (m *Module) Register(r *gin.Engine, ctx *module.ModuleContext) {

	repo := repository.NewRepository(ctx.DB)
	svc := service.NewService(repo)
	h := handler.NewHandler(svc)

	group := r.Group("/api/proposals")
	{
		group.POST("/createbusiness", h.Create)
		group.GET("/getallbusiness", h.GetAll)
	}
}

// compile-time safety
//var _ module.Module = (*Module)(nil)
