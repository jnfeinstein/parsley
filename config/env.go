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
