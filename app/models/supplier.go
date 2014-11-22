package models

type Supplier struct {
	Id              int64     `json:"id"`
	OrganizationId  int64     `json:"organization_id"`
	Name            string    `json:"name"`
	PhoneNumber     string    `json:"phone_number"`
	PhysicalAddress string    `json:"physical_address"`
	EmailAddress    string    `json:"email_address"`
	Products        []Product `json:"products"`
}
