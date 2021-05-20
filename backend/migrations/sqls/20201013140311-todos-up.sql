CREATE TABLE IF NOT EXISTS todoreact.todos(
  id        INT NOT NULL AUTO_INCREMENT,
  title     VARCHAR(45) NULL,
  isDone    TINYINT NULL,
  priority  ENUM("low", "medium", "high") NULL DEFAULT "low",
  PRIMARY KEY (id)
);

INSERT INTO todoreact.todos (title, isDone, priority)
VALUES
  ("first", 1, "high"),
  ("second", 0, "medium"),
  ("third", 0, "low");