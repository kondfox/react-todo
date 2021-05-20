CREATE TABLE `todoreact`.`todos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `isDone` TINYINT NULL,
  `priority` ENUM("low", "medium", "high") NULL DEFAULT 'low',
  PRIMARY KEY (`id`));
