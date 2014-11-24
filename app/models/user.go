package models

import (
	"parsley/db"
	"time"
)

type User struct {
	Id            int64          `json:"id"`
	Emails        []Email        `json:"emails"`
	Organizations []Organization `json:"organizations" gorm:"many2many:users_organizations;"`
	FirstName     string         `json:"firstname"`
	LastName      string         `json:"lastname"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

func NewUser(conn db.Connection, emailAddresses []string, first string, last string) (*User, error) {
	user := User{Emails: []Email{}, FirstName: first, LastName: last}
	for _, email := range emailAddresses {
		user.Emails = append(user.Emails, Email{Address: email})
	}
	if err := conn.Save(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
