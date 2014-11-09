package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"html/template"
	"log"
	_ "parsley/app/controllers"
	_ "parsley/app/models"
	"parsley/config"
	"parsley/db"
	"parsley/internals"
	"runtime"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	m := martini.Classic()
	config.Initialize(m)

	conn, err := db.NewConnection()
	if err != nil {
		log.Fatalf("%s\n", err.Error())
	}
	m.Map(*conn)
	m.Use(sessions.Sessions("my_session", sessions.NewCookieStore([]byte("secret123"))))
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

	for _, c := range internals.AllControllers {
		c.Initialize(m)
	}

	m.Run()
}
