// +build heroku

package config

import (
	"fmt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/gorelic"
	"os"
)

const AppName = "parsley"
const Heroku = true
const Environment = "production"

func Initialize(m *martini.ClassicMartini) {
	fmt.Println("Running in production environment")

	newRelicLicenseKey := os.Getenv("NEW_RELIC_LICENSE_KEY")
	if len(newRelicLicenseKey) > 0 {
		gorelic.InitNewrelicAgent(newRelicLicenseKey, AppName, true)
		m.Use(gorelic.Handler)
	}
}
