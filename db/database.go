package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
	"parsley/config"
)

type Connection struct {
	*gorm.DB
}

func NewConnection() (*Connection, error) {
	db, err := gorm.Open("postgres", config.PostgresArgs)
	if err != nil {
		return nil, err
	}
	return &Connection{&db}, nil
}
