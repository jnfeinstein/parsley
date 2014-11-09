package models

import (
	"parsley/db"
	"time"
)

type Cat struct {
	Id        int64     `json:"id"`
	Url       string    `json:"url" sql:"size:255"`
	CreatedAt time.Time `json:"createdAt"`
}

func (c Cat) Migrate(db *db.DatabaseConnection) error {
	return db.AutoMigrate(&Cat{}).Error
}

func init() {
	db.MigrateMe(Cat{})
}
