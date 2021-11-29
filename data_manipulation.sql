/*******************************************/
-- User page queries
/*******************************************/

--display all users from the users table
SELECT customerID, firstName, lastName, DATE_FORMAT(birthdate, '%m-%d-%Y') AS birthdate, email, zip 
FROM users 
Order by customerID;

--search users 
SELECT * FROM users WHERE firstName = :firstNameInput and lastName = :lastNameInput;

--insert a new user
INSERT INTO users (firstName, lastName, birthDate, email, zip)
VALUES (:firstNameInput, :lastNameInput, :birthDateInput, :emailInput, :zipInput);

--delete a user
DELETE FROM users WHERE customerID = :customerIDInput;

--update an user
UPDATE users 
SET firstName = :firstNameInput, lastName = :lastNameInput, birthDate = :birthDateInput, email = :emailInput, zip = :zipInput
WHERE customerID = :customerIDInput;


/*******************************************/
-- Artist page queries
/*******************************************/
-- display all artists from the artists table
SELECT artistID, name FROM artists ORDER BY artistID;

-- search artists
SELECT * FROM artists WHERE name = :nameInput;

-- insert a new artist
INSERT INTO artists (name) VALUES (:nameInput);

--delete an artist
DELETE FROM artist WHERE artistID = :artistIDInput;

--update an artist
UPDATE artists 
SET name = :nameInput
WHERE artistID = :artistIDInput;

/*******************************************/
-- Album page queries
/*******************************************/
-- display all albums from the albums table
SELECT albumID, title, albumArt, artist, genre, releaseDate FROM albums ORDER BY albumID;

-- search albums
SELECT * FROM albums WHERE title = :titleInput;

-- insert a new album (need to add in artist name cell)
INSERT INTO albums (title, albumArt, artist, genre, releaseDate) VALUES (:titleInput, :albumArtInput, :artistInput, :genreInput, :releaseDateInput);

--delete an album
DELETE FROM album WHERE albumID = :albumIDInput;

--update an album
UPDATE albums 
SET title = :nameInput, albumArt = :albumArtInput, artist = :artistInput, genre = :genreInput, releaseDate = :releaseDateInput
WHERE artistID = :artistIDInput;

/*******************************************/
-- Order page queries
/*******************************************/
-- display all orders from the orders table
SELECT orderID, customerID FROM orders ORDER BY orderID;

-- search orders
SELECT * FROM orders WHERE customerID = :customerIDInput;

-- insert a new order
INSERT INTO orders (customerID) VALUES (:customerIDInput);

--delete an order
DELETE FROM order WHERE orderID = :orderIDInput;

--update an order
UPDATE orders 
SET customerID = :customerIDInput
WHERE orderID = :orderIDInput;

/*******************************************/
-- Songs page queries
/*******************************************/
-- display all songs from the songs table
SELECT songID, title, songLength, artist, album FROM songs ORDER BY songID;

-- search songs
SELECT * FROM songs WHERE title = :titleInput;

-- insert a new song (need to fix length input later)
INSERT INTO songs (title, songLength, artist, album) VALUES (:titleInput, :songLengthInput, :artistInput, :albumInput);

--delete an song
DELETE FROM songs WHERE songID = :songIDInput;

--update an order
UPDATE songs 
SET title = :titleInput, songLength = :songLength, artist = :artistInput, album = :albumInput
WHERE orderID = :orderIDInput;

/*******************************************/
-- Album_Owners page queries
/*******************************************/
-- display all album owners from the album_owners table
SELECT albumID, customerID FROM album_owners ORDER BY albumID;

-- search albums_owners
SELECT * FROM album_owners WHERE customerID = :customerIDInput;

-- insert a new album_owners
INSERT INTO album_owners (customerID, albumID) VALUES (:customerIDInput, :albumIDInput);

--delete an album owner
DELETE FROM album_owners WHERE albumID = :albumID AND customerID = :customerID;

--update an album owner
UPDATE album_owners
SET albumID = :albumID, customerID = :customerID
WHERE albumID = :albumID AND customerID = :customerID

/*******************************************/
-- Order_Contents page queries
/*******************************************/
-- display all order contents from the order_contents table
SELECT orderID, albumID FROM order_contents ORDER BY orderID;

-- search order_contents
SELECT * FROM order_contents WHERE orderID = :orderIDInput;

-- insert a new order_contents
INSERT INTO order_contents (orderID, albumID) VALUES (:orderIDInput, :albumIDInput);

--delete an order's contents
DELETE FROM order_contents WHERE orderID = :orderID AND customerID = :customerID;

--update an order's contents
UPDATE order_contents
SET orderID = :orderIDInput, albumID = :albumIDInput
WHERE orderID = :orderID AND customerID = :customerID;
