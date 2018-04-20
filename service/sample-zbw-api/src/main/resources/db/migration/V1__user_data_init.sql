-- -----------------------------------------------------
-- Schema zbw
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` LONG NOT NULL,
  `username` VARCHAR(254) NOT NULL,
  `password` VARCHAR(255) NULL,
  `first_name` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NULL,
  `image` VARCHAR(512) NULL,
  `status` VARCHAR(64) NULL,
  `enabled` TINYINT(1) NULL DEFAULT 0,
  `reset_key` VARCHAR(64) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `reset_key_UNIQUE` (`reset_key` ASC));

--password=secret
INSERT INTO users (id, username, password, first_name, last_name, image, status, enabled, reset_key)
VALUES (1, 'user@example.org', '$2a$10$x5udSzDyTMWOkXG7HRJx5.LpqHayAUkvZ98Gw/aKxiMsdR3gboDJG', 'Default', 'User',
  '/assets/img/profile-image.jpg', 'ONLINE', 1, 'valid-token');

