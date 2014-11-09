package models

import (
	"parsley/db"
	"parsley/internals"
	"time"
)

type User struct {
	Id        int64
	Emails    []Email   `json:"emails"`
	Name      string    `sql:"size:255"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func NewUser(emailAddresses []string, conn *db.DatabaseConnection) *User {
	user := User{Emails: []Email{}}
	for _, email := range emailAddresses {
		user.Emails = append(user.Emails, Email{Address: email})
	}
	conn.Save(&user)
	return &user
}

func init() {
	internals.RegisterModel(User{})
}
