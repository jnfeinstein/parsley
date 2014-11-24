package internals

import (
	"github.com/go-martini/martini"
)

type Controller interface {
	Initialize(mr martini.Router)
}

type RouteLevel []Controller
var AllControllers RouteLevel

func (rs *RouteLevel) Initialize(mr martini.Router) {
	for _, c := range *rs {
		c.Initialize(mr)
	}
}

func (rs *RouteLevel) Register(c Controller) {
	*rs = append(*rs, c)
}

func RegisterController(c Controller) {
    AllControllers.Register(c)
}
