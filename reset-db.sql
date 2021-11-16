DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(255) NOT NULL,
 `message` TEXT NOT NULL,
 `note` DECIMAL(5,0) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `ratings` (name, message, note) VALUES ('Kahlil', 'facile de trouver une place, merci :)', 5), ('Séléna', '...les chats sont acceptés ?', 4), ('Bastien', 'très fonctionnel, top! ', 5),('Florence', 'design sympa, merci les dev ;)', 5); 
