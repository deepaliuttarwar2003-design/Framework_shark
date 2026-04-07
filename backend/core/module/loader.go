package module

import "github.com/gin-gonic/gin"

type Loader struct {
	modules []Module
}

func NewLoader() *Loader {
	return &Loader{}
}

func (l *Loader) Register(m Module) {
	l.modules = append(l.modules, m)
}

func (l *Loader) InitAll(ctx *ModuleContext) {
	for _, m := range l.modules {
		m.Init(ctx)
	}
}

func (l *Loader) SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")

	for _, m := range l.modules {
		group := api.Group("/" + m.Name())
		m.RegisterRoutes(group)
	}
}
