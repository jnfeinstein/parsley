package handlers

import (
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/oauth2"
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
	if tokens.IsExpired() {
		http.Error(w, "Unauthorized", http.StatusForbidden)
	}
	var user User
	userId := s.Get("user_id")
	// Check if user exists
	if userId != nil && conn.First(&user, userId).Error != nil {
		userId = nil
	}
	// If user doesn't exist, make a new user
	if userId == nil {
		if profile := fetchGoogleProfile(tokens.Access()); profile != nil {
			emails := []Email{}
			conn.Where("address in (?)", profile.EmailAddresses()).Find(&emails)
			if len(emails) > 0 {
				s.Set("user_id", emails[0].UserId)
			} else {
				user := NewUser(conn, profile.EmailAddresses(), profile.Name.First, profile.Name.Last)
				s.Set("user_id", user.Id)
			}
		} else {
			http.Error(w, "Error communicating with Google", http.StatusInternalServerError)
		}
	}
}
