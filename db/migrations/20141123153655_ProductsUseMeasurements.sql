-- +goose Up
ALTER TABLE products
ADD COLUMN unit_id BIGINT REFERENCES units (id),
ALTER COLUMN unit_amount TYPE DOUBLE PRECISION;

UPDATE products
SET unit_id=u.id
FROM units u
WHERE u.name=unit_key;

ALTER TABLE products
DROP COLUMN unit_key;

-- +goose Down

ALTER TABLE products
ADD COLUMN unit_key text;

UPDATE products
SET unit_key=u.name
FROM units u
where u.id=unit_id;

ALTER TABLE products
DROP COLUMN unit_id,
ALTER COLUMN unit_amount TYPE INTEGER;
