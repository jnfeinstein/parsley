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
  user_id BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP
);

-- +goose Down
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS emails;
