package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	. "parsley/app/handlers"
	. "parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type OrganizationController struct{}

func (o *OrganizationController) Initialize(m *martini.ClassicMartini) {
	m.Get("/organizations/:organization_id/suppliers", UserRequired, SetupOrganization, func(r render.Render, conn db.Connection, o *Organization) {
		var suppliers []Supplier
		conn.Model(o).Related(&suppliers)
		r.JSON(200, suppliers)
	})
}

func init() {
	internals.RegisterController(&OrganizationController{})
}
