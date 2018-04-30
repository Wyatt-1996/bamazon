CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    -- unique id number for each new product added
    item_id INT(1000) AUTO_INCREMENT NOT NULL;
    -- name of product (up to 100 char)
    product_name VARCHAR(100) NOT NULL;
    -- department (category)
    department_name VARCHAR(100) NOT NULL;
    -- item price to customer
    price INT(1000) NOT NULL;
    -- quantity of product in stock
    stock_quantity INT(1000) NOT NULL;
    -- all data contained within item_id will be unique
    PRIMARY KEY (item_id)
);

-- input mock data to the table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("xbox", "electronics", 300, 150),
       ("playstation", "electronics", 299, 200),
       ("gameboy", "electronics", 50, 25),
       ("harry potter", "books", 12, 200),
       ("the lord of the rings", "books", 15, 250),
       ("scrabble", "board games", 30, 100),
       ("the cat in the hat", "books", 9, 75),
       ("planet of the apes", "movies", 15, 100),
       ("titanic", "movies", 12, 50),
       ("baseball hat", "clothes", 15, 100),
       ("watermelon", "food", 4, 30);

-- select following things from table
SELECT item_id, product_name, price
FROM products;