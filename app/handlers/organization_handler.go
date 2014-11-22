package handlers

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"net/http"
	. "parsley/app/models"
	"parsley/db"
)

func SetupOrganization(conn db.Connection, c martini.Context, r render.Render, u *User, p martini.Params) {
	orgId := p["organization_id"]

	if len(orgId) == 0 {
		r.Error(http.StatusBadRequest)
		return
	}

	if u == nil {
		r.Error(http.StatusBadRequest)
		return
	}

	var org Organization
	if err := conn.First(&org, orgId).Error; err == db.NotFound {
		r.Error(http.StatusBadRequest)
		return
	}

	var userAuthorized int
	conn.Table("users_organizations").Select("id").Where("user_id = ? AND organization_id = ?", u.Id, org.Id).Count(&userAuthorized)
	if userAuthorized == 0 {
		r.Error(http.StatusForbidden)
	}

	c.Map(&org)
}
