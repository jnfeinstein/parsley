package config

import (
	"flag"
)

var flagEnv = flag.String("env", "development", "which DB environment to use")

func Env() string {
	return *flagEnv
}

func Development() bool {
	return Env() == "development"
}

func Url() string {
	if Development() {
		return "http://localhost:3000"
	} else {
		return "http://parsleyapp.herokuapp.com"
	}
}
