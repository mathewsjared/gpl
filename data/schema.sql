DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(31),
  last_name VARCHAR(63),
  email VARCHAR(255),
  username VARCHAR(63),
  password VARCHAR(63)
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  user_id1 SMALLINT,
  score1 SMALLINT,
  user_id2 SMALLINT,
  score2 SMALLINT
);
