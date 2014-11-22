package models

type Product struct {
	Id           int64  `json:"id"`
	SupplierId   int64  `json:"supplier_id"`
	IngredientId int64  `json:"ingredient_id"`
	Name         string `json:"name"`
	UnitKey      string `json:"unit_key"`
	UnitAmount   int64  `json:"unit_amount"`
	Cost         int64  `json:"cost"`
}
