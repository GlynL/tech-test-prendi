BEGIN TRANSACTION;

CREATE TABLE clicks(
  id SERIAL PRIMARY KEY,
  colour VARCHAR(100),
  x INT,
  y INT,
  user_id INT REFERENCES users(id)
);

COMMIT;