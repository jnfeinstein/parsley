package controllers

import (
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"log"
	"net/http"
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

	m.Post("/suppliers", func(r render.Render, req *http.Request) {
		supplier := models.Supplier{}

		if json.NewDecoder(req.Body).Decode(&supplier) != nil {
			r.Error(401)
			return
		} else if supplier.Name == "" {
			r.Error(400)
			return
		}
		conn.Save(supplier) // updates if ID provided
		r.JSON(200, supplier)
	})
}

func init() {
	internals.RegisterController(SuppliersController{})
}
