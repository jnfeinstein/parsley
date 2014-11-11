package internals

import (
	"github.com/go-martini/martini"
)

type Controller interface {
	Initialize(m *martini.ClassicMartini)
}

var AllControllers []Controller = []Controller{}

func RegisterController(c Controller) {
	AllControllers = append(AllControllers, c)
}
