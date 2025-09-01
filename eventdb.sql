-- Event Management Database Setup

CREATE DATABASE IF NOT EXISTS eventdb;
USE eventdb;

-- Drop table if exists for fresh setup
DROP TABLE IF EXISTS events;

-- Create events table
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(100) NOT NULL
);

-- Insert some sample events
INSERT INTO events (name, date, location) VALUES
('Tech Conference 2025', '2025-09-15', 'Mumbai'),
('React Workshop', '2025-09-20', 'Delhi'),
('Startup Meetup', '2025-09-25', 'Bangalore');
