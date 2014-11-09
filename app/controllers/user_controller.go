package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"parsley/config"
	"parsley/internals"
)

type UserController struct{}

func (u *UserController) Initialize(m *martini.ClassicMartini) {
	m.Use(oauth2.Google(&config.GoogleOAuthConfig))
}

func init() {
	internals.RegisterController(&UserController{})
}
