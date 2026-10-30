-- Creates login setup
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
);
INSERT INTO users (email,password) VALUES ('testuser@popmap.com','password123');
