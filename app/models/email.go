package models

import (
	"parsley/internals"
	"time"
)

type Email struct {
	Id        int64
	UserId    int64
	Address   string    `json:"address" sql:"type:varchar(100);not null;unique"`
	CreatedAt time.Time `json:"createdAt"`
}

func init() {
	internals.RegisterModel(Email{})
}
