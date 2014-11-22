-- +goose Up
CREATE TABLE ingredients
(
  id BIGSERIAL PRIMARY KEY,
  organization_id BIGINT NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX idx_ingredients_organization_id ON ingredients (organization_id);

CREATE TABLE suppliers
(
  id BIGSERIAL PRIMARY KEY,
  organization_id BIGINT NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  name TEXT,
  phone_number TEXT,
  physical_address TEXT,
  email_address TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
CREATE INDEX idx_suppliers_organization_id ON suppliers (organization_id);

CREATE TABLE products
(
	id BIGSERIAL PRIMARY KEY,
	ingredient_id BIGINT NOT NULL REFERENCES ingredients (id) ON DELETE CASCADE,
	supplier_id BIGINT NOT NULL REFERENCES suppliers (id) ON DELETE CASCADE,
	name TEXT,
	unit_key TEXT,
	unit_amount INTEGER,
	cost INTEGER,
	created_at TIMESTAMP,
	updated_at TIMESTAMP
);
CREATE INDEX idx_products_ingredient_id ON products (ingredient_id);
CREATE INDEX idx_products_supplier_id ON products (supplier_id);

-- +goose Down
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS suppliers;
