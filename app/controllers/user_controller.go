package controllers

import (
	"fmt"
	"github.com/go-martini/martini"
	goauth2 "github.com/golang/oauth2"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"net/http"
	"parsley/app/handlers"
	. "parsley/app/models"
	"parsley/config"
	"parsley/db"
	"parsley/internals"
)

type UserController struct{}

func (u *UserController) Initialize(m *martini.ClassicMartini) {
	m.Use(oauth2.Google(
		goauth2.Client("242182491314-3kv6lg5gbqi3tcfp42fr2s1kvqkg09ih.apps.googleusercontent.com", "QJUY1sHMJhoZlJ6E10W9cJqz"),
		goauth2.RedirectURL(config.Url()+"/oauth2callback"),
		goauth2.Scope("profile", "email"),
	))

	m.Get("/users/me", handlers.UserRequired, func(conn db.Connection, s sessions.Session, r render.Render, u *User) {
		conn.Model(u).Association("Organizations").Find(&u.Organizations)
		r.JSON(200, u)
	})

	m.Get("/loggedin", oauth2.LoginRequired, func(w http.ResponseWriter) {
		fmt.Fprintf(w, "You will be redirected soon...")
	})
}

func init() {
	internals.RegisterController(&UserController{})
}
