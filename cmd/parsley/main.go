package main

import (
	"flag"
	"fmt"
	"os"
	"strings"
	"text/template"
)

var commands = []*Command{
	serverCmd,
}

func main() {
	flag.Usage = usage
	flag.Parse()

	args := flag.Args()
	if len(args) == 0 || args[0] == "-h" {
		flag.Usage()
		return
	}

	var cmd *Command
	name := args[0]
	for _, c := range commands {
		if strings.HasPrefix(c.Name, name) {
			cmd = c
			break
		}
	}

	if cmd == nil {
		fmt.Printf("error: unknown command %q\n", name)
		flag.Usage()
		os.Exit(1)
	}

	cmd.Exec(args[1:])
}

func usage() {
	fmt.Print(usagePrefix)
	flag.PrintDefaults()
	usageTmpl.Execute(os.Stdout, commands)
}

var usagePrefix = `
parlsey - it's good for you!

Usage:
    parsley [options] <subcommand> [subcommand options]

Options:
`
var usageTmpl = template.Must(template.New("usage").Parse(
	`
Commands:{{range .}}
    {{.Name | printf "%-10s"}} {{.Summary}}{{end}}
`))
