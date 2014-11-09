package main

import (
	"fmt"
	_ "parsley/app/models"
	. "parsley/db"
)

func main() {
	fmt.Println("Beginning migration")
	numMigrated, err := Migrate()
	if err != nil {
		fmt.Println("Error migrating database")
	} else {
		fmt.Printf("Migrated %d models\n", numMigrated)
	}
}
