package controllers

import (
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"net/http"
	"parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type SuppliersController struct{}

func (sc SuppliersController) Initialize(m *martini.ClassicMartini) {

	m.Get("/suppliers/list", func(r render.Render, conn *db.Connection) {
		suppliers := []models.Supplier{}
		conn.Find(&suppliers)
		r.JSON(200, suppliers)
	})

	m.Post("/suppliers", func(r render.Render, req *http.Request, conn *db.Connection) {
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
