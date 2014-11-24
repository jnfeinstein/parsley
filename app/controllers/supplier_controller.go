package controllers

import (
	"github.com/codegangsta/martini-contrib/binding"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	. "parsley/app/models"
	"parsley/db"
)

type SuppliersController struct{}

func (sc SuppliersController) Initialize(m martini.Router) {

	m.Get("/suppliers/:supplier_id", func(r render.Render, conn db.Connection, p martini.Params, o *Organization) {
		var suppliers []Supplier
		conn.Model(o).Related(&suppliers)
		r.JSON(200, suppliers)
	})

	m.Post("/suppliers", binding.Bind(Supplier{}), func(r render.Render, conn db.Connection, o *Organization, s Supplier) {
		if s.Id != 0 || s.OrganizationId != 0 {
			r.Error(500)
			return
		}
		conn.Model(o).Association("Suppliers").Append(s)
		r.JSON(200, s)
	})
}

func init() {
	orgController.subControllers.Register(SuppliersController{})
}
