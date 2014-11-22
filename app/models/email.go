package models

import (
	"time"
)

type Email struct {
	Id        int64     `json:"id"`
	UserId    int64     `json:"user_id"`
	Address   string    `json:"address"`
	CreatedAt time.Time `json:"created_at"`
}
