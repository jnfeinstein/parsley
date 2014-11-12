// +build !heroku

package config

import (
	"github.com/go-martini/martini"
)

func Initialize(m *martini.ClassicMartini) {
	m.Use(martini.Static("private"))
	m.Use(martini.Static("tmp"))
}
