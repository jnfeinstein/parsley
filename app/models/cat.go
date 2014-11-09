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

func init() {
	db.Register(Cat{})
}
