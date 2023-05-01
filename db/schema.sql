-- Create the database
CREATE DATABASE IF NOT EXISTS playlist_generator_db;

-- Use the database
USE playlist_generator_db;

-- Create the songs table
CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  genre VARCHAR(255) NOT NULL,
  length INT NOT NULL
);

-- Create the playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create the playlist_songs table to store the relationship between playlists and songs
CREATE TABLE IF NOT EXISTS playlist_songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT NOT NULL,
  song_id INT NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id),
  FOREIGN KEY (song_id) REFERENCES songs(id)
);
