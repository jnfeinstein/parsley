package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
	"parsley/config"
)

type DatabaseConnection struct {
	*gorm.DB
}

func NewDatabaseConnection() (*DatabaseConnection, error) {
	db, err := gorm.Open("postgres", config.PostgresArgs)
	if err != nil {
		return nil, err
	}
	return &DatabaseConnection{&db}, nil
}

type MigrateAble interface {
	Migrate(*DatabaseConnection) error
}

var toMigrate []MigrateAble = []MigrateAble{}

func MigrateMe(m MigrateAble) {
	toMigrate = append(toMigrate, m)
}

func Migrate() (int, error) {
	db, err := NewDatabaseConnection()
	if err != nil {
		return -1, err
	}

	for _, m := range toMigrate {
		err := m.Migrate(db)
		if err != nil {
			return -1, err
		}
	}

	return len(toMigrate), nil
}
