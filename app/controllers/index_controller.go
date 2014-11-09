package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"net/http"
	"parsley/internals"
)

type IndexController struct{}

func (i *IndexController) Initialize(m *martini.ClassicMartini) {
	m.Get("/", func(w http.ResponseWriter, r *http.Request, r render.Render, tokens oauth2.Tokens) {
		if tokens.IsExpired() {
			r.HTML(200, "index", nil)
		} else {
			http.Redirect(w, r, "/parsley", http.StatusTemporaryRedirect)
		}
	})
}

func init() {
	internals.RegisterController(&IndexController{})
}
