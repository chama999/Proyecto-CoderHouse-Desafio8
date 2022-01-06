-- db = ecommerce
DROP TABLE IF EXISTS ecommerce.products;
CREATE TABLE ecommerce.products (
	id INT auto_increment PRIMARY KEY,
	name varchar(100) NOT NULL,
	description varchar(200) NULL,
	price INT NOT NULL,
    stock INT NOT NULL
);