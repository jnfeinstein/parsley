package controllers

import (
	"github.com/asazernik/oauth2"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"parsley/app/handlers"
	"parsley/internals"
)

type ParsleyController struct{}

func (i *ParsleyController) Initialize(m *martini.ClassicMartini) {
	m.Get("/parsley.*", oauth2.LoginRequired, handlers.UserRequired, func(r render.Render) {
		r.HTML(200, "parsley", nil)
	})
}

func init() {
	internals.RegisterController(&ParsleyController{})
}
