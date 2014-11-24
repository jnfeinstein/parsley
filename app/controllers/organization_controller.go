package controllers

import (
	"github.com/codegangsta/martini-contrib/binding"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	. "parsley/app/handlers"
	. "parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type OrganizationController struct {
	subControllers internals.RouteLevel
}

var orgController OrganizationController

func (o *OrganizationController) Initialize(m martini.Router) {
	m.Post("/organizations", UserRequired, binding.Bind(Organization{}), func(r render.Render, conn db.Connection, u *User, o Organization) {
		conn.Save(&o)
		conn.Model(&o).Association("Users").Append(u)
		r.JSON(200, o)
	})

	m.Get("/organizations/:organization_id/suppliers", UserRequired, SetupOrganization, func(r render.Render, conn db.Connection, o *Organization) {
		var suppliers []Supplier
		conn.Model(o).Related(&suppliers)
		r.JSON(200, suppliers)
	})

	m.Group("/organizations/:organization_id", func(m martini.Router) {
		o.subControllers.Initialize(m)
	}, UserRequired, SetupOrganization)

}

func init() {
	internals.RegisterController(&orgController)
}
