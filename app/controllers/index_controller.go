package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"parsley/internals"
)

type IndexController struct{}

func (i *IndexController) Initialize(m *martini.ClassicMartini) {
	m.Get("/", func(tokens oauth2.Tokens) {

	})
}

func init() {
	internals.RegisterController(&IndexController{})
}
