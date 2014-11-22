-- +goose Up
CREATE TABLE users
(
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE emails
(
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  address VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP
);
CREATE INDEX idx_emails_user_id ON emails (user_id);

-- +goose Down
DROP TABLE IF EXISTS emails;
DROP TABLE IF EXISTS users;
