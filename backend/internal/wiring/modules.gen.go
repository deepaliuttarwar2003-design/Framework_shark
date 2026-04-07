package wiring

import (
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/core/module"
	"github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/health"
)

func LoadModules() []module.Module {
	return []module.Module{
		health.NewModule(),
	}
}
