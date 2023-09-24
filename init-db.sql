CREATE TABLE IF NOT EXISTS todo (
  id SERIAL PRIMARY KEY,
  title varchar(250),
  task varchar(2000),
  "creationDate" TIMESTAMP,
  "doneAtDate" TIMESTAMP
)