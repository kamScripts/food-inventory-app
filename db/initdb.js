#! /usr/bin/env node

require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS subtype (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (30) UNIQUE NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT fk_categories
        FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS brand (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS unit (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(10) UNIQUE NOT NULL,
    abbr VARCHAR(3) UNIQUE
);
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    weight INTEGER,
    price NUMERIC,
    subtype_id INTEGER NOT NULL,
    brand_id INTEGER NOT NULL,
    unit_id INTEGER NOT NULL,

    CONSTRAINT fk_subtype
        FOREIGN KEY (subtype_id)
        REFERENCES subtype(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_brand
        FOREIGN KEY (brand_id)
        REFERENCES brand(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_unit
        FOREIGN KEY (unit_id)
        REFERENCES unit(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
CREATE TABLE IF NOT EXISTS storage (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (20) NOT NULL
);
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    quantity INTEGER NOT NULL,
    exp_date DATE NOT NULL,
    purchase_date DATE NOT NULL DEFAULT NOW(),
    product_id INTEGER NOT NULL,
    storage_id INTEGER NOT NULL,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES product(id)
        ON UPDATE CASCADE,
    CONSTRAINT fk_storage
        FOREIGN KEY (storage_id)
        REFERENCES storage(id)
);
INSERT INTO category (name) 
VALUES
    ('dairy'),
    ('meat'),
    ('fish'),
    ('eggs'),
    ('vegetables'),
    ('fruits'),
    ('grains'),
    ('bakery'),
    ('sauces'),
    ('beverages');

INSERT INTO subtype (name, category_id)
VALUES
    ('Yoghurt', 1),
    ('Milk', 1),
    ('Beef', 2),
    ('Chicken', 2),
    ('Broccoli', 5),
    ('Tuna',3),
    ('free-range', 4),
    ('Bread', 8),
    ('Ketchup', 9),
    ('Mayo', 9),
    ('Rice', 7),
    ('Oats', 7),
    ('juice', 10);

INSERT INTO brand (name)
VALUES
    ('Tesco'),
    ('Sainsbury''s'),
    ('Aldi'),
    ('Heinz'),
    ('Hellmann''s'),
    ('Arla'),
    ('Müller'),
    ('Hovis'),
    ('John West'),
    ('Tropicana');

INSERT INTO unit (name, abbr)
VALUES
    ('gram', 'g'),
    ('kilogram', 'kg'),
    ('millilitre', 'ml'),
    ('litre', 'l'),
    ('piece', 'pc'),
    ('pack', 'pk'),
    ('slice', 'sl'),
    ('bottle', 'btl'),
    ('can', 'cn'),
    ('loaf', 'lf');

INSERT INTO storage (name)
VALUES
    ('fridge'),
    ('freezer'),
    ('pantry'),
    ('cupboard'),
    ('cellar'),
    ('garage'),
    ('spice rack'),
    ('bread bin'),
    ('fruit bowl'),
    ('drinks shelf');

INSERT INTO product (name, weight, price, subtype_id, brand_id, unit_id)
VALUES
    ('Greek Style Yoghurt', 500, 1.85, 1, 7, 1),
    ('Semi-Skimmed Milk', 2, 1.45, 2, 6, 4),
    ('Beef Mince 5% Fat', 500, 3.99, 3, 1, 1),
    ('Chicken Breast Fillets', 650, 4.25, 4, 3, 1),
    ('Broccoli Head', 1, 0.79, 5, 2, 5),
    ('Tuna Chunks in Brine', 145, 1.10, 6, 9, 9),
    ('Free Range Eggs 10pk', 10, 2.50, 7, 2, 6),
    ('Wholemeal Bread', 800, 1.40, 8, 8, 10),
    ('Tomato Ketchup', 460, 2.75, 9, 4, 8),
    ('Orange Juice Smooth', 900, 2.20, 13, 10, 3);

INSERT INTO items (quantity, exp_date, product_id, storage_id)
VALUES
    (2, '2026-09-05', 1, 1),
    (1, '2026-08-28', 2, 1),
    (1, '2026-08-26', 3, 1),
    (2, '2027-02-15', 4, 2),
    (1, '2026-08-27', 5, 1),
    (4, '2028-05-01', 6, 3),
    (1, '2026-09-08', 7, 1),
    (1, '2026-08-30', 8, 8),
    (1, '2027-03-12', 9, 4),
    (2, '2026-09-15', 10, 1);
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: `postgresql://${process.env.SEED_USER}:${process.env.SEED_PASS}@localhost:${process.env.DB_PORT}/food_inventory`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();