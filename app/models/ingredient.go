package models

type Ingredient struct {
	Id             int64  `json:"id"`
	OrganizationId int64  `json:"organization_id"`
	Name           string `json:"name"`
}
