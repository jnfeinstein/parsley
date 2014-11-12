package config

import (
	gooauth2 "github.com/golang/oauth2"
)

var GoogleOAuthConfig = gooauth2.Options{
	ClientID:     "242182491314-3kv6lg5gbqi3tcfp42fr2s1kvqkg09ih.apps.googleusercontent.com",
	ClientSecret: "QJUY1sHMJhoZlJ6E10W9cJqz",
	RedirectURL:  Url() + "/oauth2callback",
	Scopes:       []string{"profile email"},
}
