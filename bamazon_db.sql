DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(10,2),
    stock_quantity INTEGER
);

-- Ex product inserted into the database table "products"
-- Each product inserted into the table will follow this format
-- Delete or comment out the template so not to generate it in the database
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ExProduct", "ExDepartment", 12.34, 567);
