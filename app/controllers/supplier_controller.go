package controllers

import (
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"net/http"
	"parsley/app/handlers"
	"parsley/app/models"
	"parsley/db"
	"parsley/internals"
)

type SuppliersController struct{}

func (sc SuppliersController) Initialize(m *martini.ClassicMartini) {

	m.Get("/suppliers/list", handlers.UserRequired, func(r render.Render, conn db.Connection, s sessions.Session) {
		user_id, ok := s.Get("user_id").(int64)
		if !ok {
			r.Error(500)
			return
		}
		suppliers := []models.Supplier{}
		conn.Where("user_id = ?", user_id).Find(&suppliers)
		r.JSON(200, suppliers)
	})

	m.Post("/suppliers", func(r render.Render, req *http.Request, conn db.Connection, s sessions.Session) {
		user_id, ok := s.Get("user_id").(int64)
		if !ok {
			r.Error(500)
			return
		}
		supplier := models.Supplier{}

		if json.NewDecoder(req.Body).Decode(&supplier) != nil {
			r.Error(401)
			return
		} else if supplier.Name == "" {
			r.Error(400)
			return
		}
        supplier.UserId = user_id
		conn.Save(supplier) // updates if ID provided
		r.JSON(200, supplier)
	})
}

func init() {
	internals.RegisterController(SuppliersController{})
}
