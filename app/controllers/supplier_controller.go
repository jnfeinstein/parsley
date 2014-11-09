package controllers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"log"
	"parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type SuppliersController struct{}

func (s SuppliersController) Initialize(m *martini.ClassicMartini) {
	conn, err := db.NewDatabaseConnection()
	if err != nil {
		log.Fatalf("supplier_controller: %s\n", err.Error())
	}

	m.Get("/suppliers/list", func(r render.Render) {
		suppliers := []models.Supplier{}
		conn.Find(&suppliers)
		r.JSON(200, suppliers)
	})

}

func init() {
	internals.RegisterController(SuppliersController{})
}
