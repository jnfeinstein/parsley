package db

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/kylelemons/go-gypsy/yaml"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
	"os"
	"parsley/config"
	"path/filepath"
)

type DBDriver struct {
	Driver string
	Open   string
}

func newDBDriver(path, env string) (*DBDriver, error) {
	cfgFile := filepath.Join(path, "dbconf.yml")

	f, err := yaml.ReadFile(cfgFile)
	if err != nil {
		return nil, err
	}

	driver, err := f.Get(fmt.Sprintf("%s.driver", env))
	if err != nil {
		return nil, err
	}
	driver = os.ExpandEnv(driver)

	open, err := f.Get(fmt.Sprintf("%s.open", env))
	if err != nil {
		return nil, err
	}
	open = os.ExpandEnv(open)
	return &DBDriver{driver, open}, nil
}

type Connection struct {
	*gorm.DB
}

func NewConnection() (*Connection, error) {
	driver, err := newDBDriver("./db", config.Environment)
	if err != nil {
		return nil, err
	}
	db, err := gorm.Open(driver.Driver, driver.Open)
	if err != nil {
		return nil, err
	}
	return &Connection{&db}, nil
}
