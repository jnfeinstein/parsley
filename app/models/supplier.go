package models

import ()

type Supplier struct {
	Id     int64  `json:"id"`
	User   User   `json:"-"`
	UserId int64  `json:"-"`
	Name   string `json:"name"`
}
