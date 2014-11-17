package models

import (
	"database/sql"
	"parsley/internals"
)

type Ingredient struct {
	Id           int64 `json:"id"`
	User         User  `json:"-"`
	UserId       int64 `json:"user_id"`
	SuppliedBy   IngredientSupplier
	SuppliedById sql.NullInt64
	// TODO: Add actual unit measurements
	Unit string `json:"unit_name"`
}

func init() {
	internals.RegisterModel(Ingredient{})
}
