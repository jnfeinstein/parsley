package handlers

import (
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"io/ioutil"
	"log"
	"net/http"
	. "parsley/app/models"
	"parsley/db"
)

const googleProfileUrl = "https://www.googleapis.com/plus/v1/people/me"

type googleName struct {
	Last  string `json:"familyName"`
	First string `json:"givenName"`
}

type googleEmail struct {
	Value string `json:"value"`
}

type googleProfile struct {
	Emails []googleEmail `json:"emails"`
	Name   googleName    `json:"name"`
}

func (gp *googleProfile) EmailAddresses() []string {
	emails := []string{}
	for _, email := range gp.Emails {
		emails = append(emails, email.Value)
	}
	return emails
}

func fetchGoogleProfile(accessToken string) *googleProfile {
	resp, err := http.Get(googleProfileUrl + "?access_token=" + accessToken)
	if err != nil {
		log.Fatalf("user_controller: %s\n", err.Error())
		return nil
	}
	body, _ := ioutil.ReadAll(resp.Body)
	profile := googleProfile{}
	json.Unmarshal(body, &profile)
	return &profile
}

func UserRequired(conn db.Connection, r render.Render, tokens oauth2.Tokens, s sessions.Session, c martini.Context) {
	if tokens.Expired() {
		r.Error(http.StatusForbidden)
		return
	}
	var user User
	userId := s.Get("user_id")

	// Check if user exists
	if userId != nil && conn.First(&user, userId).Error == nil {
		// Valid user
		c.Map(&user)
		return
	}
	// Try to pull profile from Google
	profile := fetchGoogleProfile(tokens.Access())
	if profile == nil {
		r.Error(http.StatusInternalServerError)
		return
	}
	// Fetch emails from db that match the Google user
	var emails []Email
	if err := conn.Where("address in (?)", profile.EmailAddresses()).Find(&emails).Error; err == db.NotFound {
		// This is a new user
		var newUser *User
		if newUser, err = NewUser(conn, profile.EmailAddresses(), profile.Name.First, profile.Name.Last); err != nil {
			r.Error(http.StatusInternalServerError)
			return
		}
		s.Set("user_id", newUser.Id)
		c.Map(&newUser)
		return
	}
	// User already has an account
	conn.First(&user, emails[0].UserId)
	s.Set("user_id", user.Id)
	c.Map(&user)
}
