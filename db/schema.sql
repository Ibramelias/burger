CREATE DATABASE burger_db;

USE burger_db;

CREATE Table burgers(
id int auto_increment,
burger_name VARCHAR (30),
devoured boolean default false,
primary key (id)
);