// +build !heroku

package config

import (
	"fmt"
	"github.com/go-martini/martini"
)

const Heroku = false
const Environment = "development"

func Initialize(m *martini.ClassicMartini) {
	fmt.Println("Running in debug environment")

	m.Use(martini.Static("private"))
	m.Use(martini.Static("tmp"))
}
