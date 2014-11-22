package models

type IngredientSupplier struct {
	Id           int64 `json:"id"`
	IngredientId int64 `json:"ingredient_id"`
	SupplierId   int64 `json:"supplier_id"`
	UnitKey      int64 `json:"unit_key"`
	Cost         int64 `json:"cost"`
}
