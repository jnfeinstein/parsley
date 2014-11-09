// +build !heroku

package config

import (
	"fmt"
	"github.com/go-martini/martini"
)

const PostgresArgs = "host=/var/run/postgresql dbname=postgres sslmode=disable"
const Heroku = false

func Initialize(m *martini.ClassicMartini) {
	fmt.Println("Running in debug environment")

	m.Use(martini.Static("private"))
	m.Use(martini.Static("tmp"))
}
