package controllers

import (
	"github.com/go-martini/martini"
	gooauth2 "github.com/golang/oauth2"
	"github.com/martini-contrib/oauth2"
	"parsley/internals"
)

const googleProfileInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo"

var googleOAuth2Cfg = gooauth2.Options{
	ClientID:     "242182491314-3kv6lg5gbqi3tcfp42fr2s1kvqkg09ih.apps.googleusercontent.com",
	ClientSecret: "QJUY1sHMJhoZlJ6E10W9cJqz",
	RedirectURL:  "http://localhost:3000/oauth2callback",
	Scopes:       []string{"profile email"},
}

type OAuthController struct{}

func (o *OAuthController) Initialize(m *martini.ClassicMartini) {
	m.Use(oauth2.Google(&googleOAuth2Cfg))

	m.Get("/user", oauth2.LoginRequired, func(tokens oauth2.Tokens) string {
		tokens.Access()
	})
}

func init() {
	internals.RegisterController(&OAuthController{})
}
