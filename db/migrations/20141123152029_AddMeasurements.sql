
-- +goose Up
CREATE TABLE dimensions (
  id BIGSERIAL PRIMARY KEY,
  name text,
  base_unit_id BIGINT,

  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE units (
  id BIGSERIAL PRIMARY KEY,
  name text,
  dimension_id BIGINT REFERENCES dimensions (id) ON DELETE CASCADE,
  multiplier DOUBLE PRECISION,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX idx_unit_dimensions on units (dimension_id);

ALTER TABLE dimensions
ADD FOREIGN KEY (base_unit_id)
REFERENCES units (id)
ON DELETE RESTRICT;

-- +goose Down

ALTER TABLE dimensions
DROP CONSTRAINT dimensions_base_unit_id_fkey;

DROP TABLE units;
DROP TABLE dimensions;

