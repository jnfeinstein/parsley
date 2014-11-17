package main

import (
	"fmt"
	"github.com/go-martini/martini"
	"log"
	"parsley/config"
	. "parsley/db"
	_ "parsley/app/models"
	"parsley/internals"
)

var migrateCmd = &Command{
	Name:    "migrate",
	Usage:   "",
	Summary: "Run a gorm auto-migration",
	Help:    `create extended help here...`,
	Run:     migrateRun,
}

func migrateRun(cmd *Command, args ...string) {
	m := martini.Classic()
    config.Initialize(m)

	if config.Development() {
		fmt.Println("Running in development environment")
	} else {
		fmt.Println("Running in production environment")
	}

	fmt.Println("Beginning migration")

	conn, err := NewConnection()
	if err != nil {
        log.Fatalf("Error opening DB connection: %s", err.Error())
	}

	for _, m := range internals.AllModels {
		conn.AutoMigrate(m)
	}

	if err != nil {
		fmt.Println("Error migrating database")
	} else {
		fmt.Printf("Migrated %d models\n", len(internals.AllModels))
	}
}
