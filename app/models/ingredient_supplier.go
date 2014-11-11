package models

import ()

type IngredientSupplier struct {
	Id           int64 `json:"id"`
	IngredientId int64 `json:"ingredient_id"`
	Supplier     Supplier
	SupplierId   int64 `json:"supplier_id"`
	Cost         int64 `json:"cost_cents"` // in cents, for rounding reasons
	// TODO: Add actual unit awareness
	Unit string `json:"purchase_unit"`
	// number of Ingredient default units per purchase unit
	UnitConversion float64 `json:"unit_conversion"`
}
