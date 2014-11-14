-- +goose Up
CREATE TABLE organizations
(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE users_organizations
(
  user_id BIGINT REFERENCES users (id) ON DELETE CASCADE,
  organization_id BIGINT REFERENCES organizations (id) ON DELETE CASCADE,
  CONSTRAINT users_organizations_unique UNIQUE (user_id, organization_id)
);
CREATE INDEX idx_user_id ON users_organizations (user_id);
CREATE INDEX idx_organization_id ON users_organizations (organization_id);

-- +goose Down
DROP TABLE IF EXISTS users_organizations;
DROP TABLE IF EXISTS organizations;
