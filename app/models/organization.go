package models

import (
	"parsley/internals"
	"time"
)

type Organization struct {
	Id        int64
	Users     []User    `gorm:"many2many:users_organizations;"`
	Name      string    `sql:"size:255"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func init() {
	internals.RegisterModel(Organization{})
}
