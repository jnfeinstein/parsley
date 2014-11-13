package controllers

import (
	"github.com/go-martini/martini"
	gooauth2 "github.com/golang/oauth2"
	"github.com/martini-contrib/oauth2"
	"parsley/config"
	"parsley/internals"
)

type UserController struct{}

func (u *UserController) Initialize(m *martini.ClassicMartini) {
	m.Use(oauth2.Google(&gooauth2.Options{
		ClientID:     "242182491314-3kv6lg5gbqi3tcfp42fr2s1kvqkg09ih.apps.googleusercontent.com",
		ClientSecret: "QJUY1sHMJhoZlJ6E10W9cJqz",
		RedirectURL:  config.Url() + "/oauth2callback",
		Scopes:       []string{"profile email"},
	}))
}

func init() {
	internals.RegisterController(&UserController{})
}
