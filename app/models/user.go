package models

import (
	"parsley/db"
	"time"
)

type User struct {
	Id            int64
	Emails        []Email        `json:"emails"`
	Organizations []Organization `gorm:"many2many:users_organizations;"`
	FirstName     string         `sql:"size:255"`
	LastName      string         `sql:"size:255"`
	CreatedAt     time.Time      `json:"createdAt"`
	UpdatedAt     time.Time      `json:"updatedAt"`
}

func NewUser(conn db.Connection, emailAddresses []string, first string, last string) *User {
	user := User{Emails: []Email{}, FirstName: first, LastName: last}
	for _, email := range emailAddresses {
		user.Emails = append(user.Emails, Email{Address: email})
	}
	conn.Save(&user)
	return &user
}
