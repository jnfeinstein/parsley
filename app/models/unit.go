package models

import (
	"fmt"
	"parsley/db"
)

type Unit struct {
	Id          int64  `json:"id"`
	Name        string `json:"name"`
	DimensionId int64  `json:"dimension_id"`
	Dimension
	Multiplier float64 `json:"multiplier"` // is larger for larger units
}

// Don't create these directly; use NewDimension
type Dimension struct {
	Id         int64  `json:"id"`
	Name       string `json:"name"`
	BaseUnitId int64  `json:"base_unit_id"`
}

func NewDimension(conn db.Connection, name string, base_unit_name string) (d Dimension, err error) {
	d = Dimension{Name: name}
	if err = conn.Create(&d).Error; err != nil {
		return
	}

	u := Unit{DimensionId: d.Id, Multiplier: 1, Name: base_unit_name}
	conn.Save(&u)
	d.BaseUnitId = u.Id
	conn.Save(&d)
	return
}

type Measurement struct {
	Amount float64
	*Unit
}

