CREATE TABLE `users` (
  `id` int(20) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `profile_image` varchar(100),
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime
);

CREATE TABLE `balance` (
  `id` int(20) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE,
  `balance` bigint(50),
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `transaction` (
  `id` int(20) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100),
  `invoice_number` varchar(100),
  `service_code` varchar(100),
  `service_name` varchar(100),
  `total_amount` bigint(50),
  `transaction_type` varchar(100),
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `banner` (
  `id` int(20) PRIMARY KEY AUTO_INCREMENT,
  `banner_name` varchar(100),
  `banner_image` varchar(100),
  `description` text
);

CREATE TABLE `services` (
  `id` int(20) PRIMARY KEY AUTO_INCREMENT,
  `service_code` varchar(100),
  `service_name` varchar(100),
  `service_icon` varchar(100),
  `service_tarif` bigint(20)
);

ALTER TABLE `balance` ADD FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

ALTER TABLE `transaction` ADD FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;
