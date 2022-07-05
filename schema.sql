DROP USER 'gader'@'localhost';
DROP DATABASE gader_dev;

CREATE USER IF NOT EXISTS 'gader'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';

CREATE DATABASE IF NOT EXISTS gader_dev;

USE gader_dev;
CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  type ENUM ('ac', 'heater', 'curtain', 'lighting', 'tv', 'camera', 'door_chime', 'thermometer_sensor', 'motion_sensor', 'door_open_sensor') NOT NULL,
  description TEXT,
  status ENUM ('on', 'off', 'alert', 'opened', 'closed', 'error') NOT NULL,
  temperature_sensor_value INT COMMENT 'Used for thermometer_sensor',
  temperature_target_value INT COMMENT 'Used for ac and heater devices'
);

GRANT ALL PRIVILEGES ON gader_dev.* TO 'gader'@'localhost';