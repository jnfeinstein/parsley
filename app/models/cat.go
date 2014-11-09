package models

import (
	"parsley/internals"
	"time"
)

type Cat struct {
	Id        int64     `json:"id"`
	Url       string    `json:"url" sql:"size:255"`
	CreatedAt time.Time `json:"createdAt"`
}

func init() {
	internals.RegisterModel(Cat{})
}
