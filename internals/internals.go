package internals

import (
	"github.com/go-martini/martini"
)

type Model interface{}

type Controller interface {
	Initialize(m *martini.ClassicMartini)
}

var AllModels []Model = []Model{}
var AllControllers []Controller = []Controller{}

func RegisterModel(m Model) {
	AllModels = append(AllModels, m)
}

func RegisterController(c Controller) {
	AllControllers = append(AllControllers, c)
}
