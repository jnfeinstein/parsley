package main

import (
	"fmt"
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
)

var serverCmd = &Command{
	Name:    "server",
	Usage:   "",
	Summary: "Run the main server",
	Help:    `create extended help here...`,
	Run:     serverRun,
}

func serverRun(cmd *Command, args ...string) {
	m := martini.Classic()
	config.Initialize(m)

	if config.Development() {
		fmt.Println("Running in development environment")
	} else {
		fmt.Println("Running in production environment")
	}

	conn, err := db.NewConnection()
	if err != nil {
		log.Fatalf("%s\n", err.Error())
	}
	m.Map(*conn)
	m.Use(sessions.Sessions("my_session", sessions.NewCookieStore([]byte("secret123"))))
	m.Use(render.Renderer(render.Options{
		Funcs: []template.FuncMap{
			{
				"development": config.Development,
			},
		},
		Layout: "app",
	}))

	for _, c := range internals.AllControllers {
		c.Initialize(m)
	}

	m.Run()
}
