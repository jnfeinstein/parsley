package handlers

import (
	"encoding/json"
	"github.com/asazernik/oauth2"
	"github.com/go-martini/martini"
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

func UserRequired(conn db.Connection, w http.ResponseWriter, r *http.Request, tokens oauth2.Tokens, s sessions.Session, c martini.Context) {
	if tokens.Expired() {
		http.Error(w, "Unauthorized", http.StatusForbidden)
	}
	var user User
	userId := s.Get("user_id")

	// Check if user exists
	if userId != nil && conn.First(&user, userId).Error == nil {
		// Valid user
		return
	}
	// Try to pull profile from Google
	profile := fetchGoogleProfile(tokens.Access())
	if profile == nil {
		http.Error(w, "Error communicating with Google", http.StatusInternalServerError)
		return
	}
	// Fetch emails from db that match the Google user
	var emails []Email
	if err := conn.Where("address in (?)", profile.EmailAddresses()).Find(&emails).Error; err != nil {
		http.Error(w, "Error looking up user", http.StatusInternalServerError)
		log.Panic(err.Error())
		return
	}
	if len(emails) > 0 {
		// User already has an account
		s.Set("user_id", emails[0].UserId)
		return
	}
	// This is a new user
	newUser, err := NewUser(conn, profile.EmailAddresses(), profile.Name.First, profile.Name.Last)
	if err != nil {
		http.Error(w, "Error creating new user", http.StatusInternalServerError)
		log.Panic(err.Error())
		return
	}
	s.Set("user_id", newUser.Id)
}
