package controllers

import (
	"fmt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"net/http"
	"parsley/app/handlers"
	. "parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type UserController struct{}

func (u *UserController) Initialize(m martini.Router) {

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
