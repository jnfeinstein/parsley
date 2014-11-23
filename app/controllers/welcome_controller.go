package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"net/http"
	"parsley/internals"
)

type WelcomeController struct{}

func (w *WelcomeController) Initialize(m *martini.ClassicMartini) {
	m.Get("/($|welcome.*)", func(w http.ResponseWriter, req *http.Request, r render.Render, tokens oauth2.Tokens) {
		if tokens.Expired() {
			r.HTML(200, "welcome", nil)
		} else {
			http.Redirect(w, req, "/parsley", http.StatusTemporaryRedirect)
		}
	})
}

func init() {
	internals.RegisterController(&WelcomeController{})
}
