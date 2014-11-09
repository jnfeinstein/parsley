package controllers

import (
	"fmt"
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
		name := req.PostFormValue("name")
		if name == "" {
			r.Error(400)
			return
		}
		supplier := models.Supplier{Name: name}
		conn.Create(&supplier)
		r.JSON(200, supplier)
	})
	m.Put("/suppliers/(?P<id>\\d+)", func(r render.Render, params martini.Params, req *http.Request) {
		var id int64
		if _, err := fmt.Sscan(params["id"], id); err != nil {
			r.Error(400)
			return
		}
		name := req.PostFormValue("name")
		if name == "" {
			r.Error(400)
			return
		}
		supplier := models.Supplier{}
		conn.First(&supplier, id)
		supplier.Name = name
		conn.Save(supplier)
		r.JSON(200, supplier)
	})
}

func init() {
	internals.RegisterController(SuppliersController{})
}
