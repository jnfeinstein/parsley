// +build heroku

package config

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/gorelic"
	"os"
)

func Initialize(m *martini.ClassicMartini) {
	newRelicLicenseKey := os.Getenv("NEW_RELIC_LICENSE_KEY")
	if len(newRelicLicenseKey) > 0 {
		gorelic.InitNewrelicAgent(newRelicLicenseKey, os.Getenv("APP_NAME"), true)
		m.Use(gorelic.Handler)
	}
}
