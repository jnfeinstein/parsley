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

func (m *Measurement) Divide(o *Measurement) (ratio float64, err error) {
	if m.DimensionId != o.DimensionId {
		err = fmt.Errorf("dividing measurements with mismatching units %s and %s", m.Unit.Name, o.Unit.Name)
		return
	}

	ratio = (m.Multiplier / o.Multiplier) * (m.Amount / o.Amount)
    return
}

func (m *Measurement) Convert(u *Unit) (r Measurement, err error) {
	if m.DimensionId != u.DimensionId {
		err = fmt.Errorf("converting measurements with mismatching units %s and %s", m.Unit.Name, u.Name)
		return
	}

	r = Measurement{Amount: m.Amount * m.Multiplier / u.Multiplier, Unit: u}
    return
}
