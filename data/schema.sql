DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(31),
  last_name VARCHAR(63),
  email VARCHAR(255),
  username VARCHAR(63),
  password VARCHAR(63)
);
DROP TABLE IF EXISTS matches;

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  username1 VARCHAR(63),
  score1 SMALLINT,
  username2 VARCHAR(63),
  score2 SMALLINT
);
