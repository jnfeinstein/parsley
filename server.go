package main

import (
	"fmt"
	"github.com/codegangsta/martini-contrib/binding"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"html/template"
	"net/http"
	"os"
	. "parsley/app/models"
	"parsley/config"
	. "parsley/db"
	"runtime"
	"strconv"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	m := martini.Classic()

	config.Initialize(m)

	db, err := NewDatabaseConnection()
	if err != nil {
		fmt.Printf("Error initializing database: %s\n", err.Error())
		os.Exit(1)
	}

	m.Use(render.Renderer(render.Options{
		Funcs: []template.FuncMap{
			{
				"heroku": func() bool {
					return config.Heroku
				},
			},
		},
		Layout: "app",
	}))

	m.Get("/", func(r render.Render) {
		r.HTML(200, "index", nil)
	})

	m.Post("/cat", binding.Bind(Cat{}), func(w http.ResponseWriter, cat Cat) {
		if err := db.Create(&cat).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		fmt.Fprintf(w, "%d", cat.Id)
	})

	m.Get("/cat/:id", func(w http.ResponseWriter, r render.Render, p martini.Params) {
		id, err := strconv.Atoi(p["id"])
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var cat Cat
		if err := db.First(&cat, id).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		r.JSON(200, cat)
	})

	m.Run()
}
