package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"parsley/app/handlers"
	"parsley/internals"
)

type ParsleyController struct{}

func (i *ParsleyController) Initialize(m *martini.ClassicMartini) {
	m.Get("/parsley", handlers.UserRequired, func(tokens oauth2.Tokens) {

	})
}

func init() {
	internals.RegisterController(&ParsleyController{})
}
