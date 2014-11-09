package models

import (
	"parsley/internals"
)

type Supplier struct {
	Id     int64  `json:"id"`
	User   User   `json:"-"`
	UserId int64  `json:"user_id"`
	Name   string `json:"name"`
}

func init() {
	internals.RegisterModel(Supplier{})
}
