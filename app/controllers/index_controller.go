package controllers

import (
	"github.com/asazernik/oauth2"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"net/http"
	"parsley/internals"
)

type IndexController struct{}

func (i *IndexController) Initialize(m *martini.ClassicMartini) {
	m.Get("/($|index.*)", func(w http.ResponseWriter, req *http.Request, r render.Render, tokens oauth2.Tokens) {
		if tokens.Expired() {
			r.HTML(200, "index", nil)
		} else {
			http.Redirect(w, req, "/parsley", http.StatusTemporaryRedirect)
		}
	})
}

func init() {
	internals.RegisterController(&IndexController{})
}
