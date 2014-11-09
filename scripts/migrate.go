package main

import (
	"fmt"
	"os"
	_ "parsley/app/models"
	. "parsley/db"
	"parsley/internals"
)

func main() {
	fmt.Println("Beginning migration")

	db, err := NewDatabaseConnection()
	if err != nil {
		fmt.Println("Error migrating database")
		os.Exit(1)
	}

	for _, m := range internals.AllModels {
		db.AutoMigrate(m)
	}

	if err != nil {
		fmt.Println("Error migrating database")
	} else {
		fmt.Printf("Migrated %d models\n", len(internals.AllModels))
	}
}
