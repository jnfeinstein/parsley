package main

import (
	"fmt"
	"os"
	_ "parsley/app/models"
	. "parsley/db"
)

func main() {
	fmt.Println("Beginning migration")

	db, err := NewDatabaseConnection()
	if err != nil {
		fmt.Println("Error migrating database")
		os.Exit(1)
	}

	db.AutoMigrate(AllModels...)

	if err != nil {
		fmt.Println("Error migrating database")
	} else {
		fmt.Printf("Migrated %d models\n", len(AllModels))
	}
}
