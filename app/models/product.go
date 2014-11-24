package models

type Product struct {
	Id           int64  `json:"id"`
	SupplierId   int64  `json:"supplier_id"`
	IngredientId int64  `json:"ingredient_id"`
	Name         string `json:"name"`
	UnitId       int64  `json:"unit_id"`
	Unit
	UnitAmount float64 `json:"unit_amount"`
	Cost       int64   `json:"cost"`
}
