package models

import (
	"time"
)

type Organization struct {
	Id        int64     `json:"id"`
	Users     []User    `json:"-" gorm:"many2many:users_organizations;"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
