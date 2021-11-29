--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
    `artistID` int(11) AUTO_INCREMENT unique not NULL,
    `name` varchar(45) not NULL,
    PRIMARY KEY (`artistID`)
);
--
-- Dumping data for table `artists`
--

LOCK TABLES artists WRITE;
INSERT INTO artists VALUES (1, 'Elliott Smith'), (2, 'Sleater-Kinney'), (3, 'Microphones');
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE `albums` (
    `albumID` int AUTO_INCREMENT unique not NULL,
    `title` varchar(45) not NULL,
    `albumArt` LONGBLOB default NULL,
    `genre` varchar(45) not NULL,
    `releaseDate` date not NULL,
    `artist` int(11) not NULL,
    PRIMARY KEY (`albumID`),
    KEY `artist` (`artist`),
    FOREIGN KEY (`artist`) REFERENCES `artists` (`artistID`)
);

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
INSERT INTO `albums` VALUES (1, 'Either/or', NULL, 'Folk', '1997-02-25', 1), (2, 'The Glow Pt. 2', NULL, 'Noise Rock', '2001-09-11', 3),
(3, 'Dig Me Out', NULL, 'Punk Rock', '2014-04-08', 2);
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `customerID` int AUTO_INCREMENT unique not NULL,
    `firstName` varchar(45) not NULL,
    `lastName` varchar(45) not NULL,
    `birthDate` date not NULL,
    `email` varchar(45) not NULL,
    `zip` int not NULL,
    PRIMARY KEY (`customerID`)
);

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1, 'John', 'McPerson', '2000-01-01', 'John@email.com', 97035), (2, 'Bat', 'Man', '1939-05-01', 'batman@batcave.com', 98101),
(3, 'Jane', 'Doe', '1972-06-22', 'doe.jane@email.com', 94104);
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
    `orderID` int AUTO_INCREMENT unique not NULL,
    `userID` int not NULL,
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`userID`) REFERENCES `users` (`customerID`)
);

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (1, 2), (2, 1), (3, 3), (4, 1);
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
    `songID` int AUTO_INCREMENT unique not NULL,
    `title` varchar(45) not NULL,
    `songLength` time not NULL,
    `artistID` int not NULL,
    `albumID` int,
    PRIMARY KEY (`songID`),
    FOREIGN KEY (`artistID`) REFERENCES `artists` (`artistID`),
    FOREIGN KEY (`albumID`) REFERENCES `albums` (`albumID`)
);

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
INSERT INTO `songs` VALUES (1, 'Speed Trials', '03:01', 1, 1), (2, 'Alameda', '03:43', 1, 1), (3, 'Balland of Big Nothing', '02:48', 1, 1), (4, 'I Want Wind to Blow', '05:32', 3, 2),
(5, 'The Glow Pt. 2', '04:58', 3, 2), (6, 'The Moon', '05:16', 3, 2), (7, 'Dig Me Out', '02:40', 2, 3), (8, 'One More Hour', '03:19', 2, 3), (9, 'Turn It On', '02:47', 2, 3);
UNLOCK TABLES;

--
-- Table structure for table `album_owners`
--

DROP TABLE IF EXISTS `album_owners`;
CREATE TABLE `album_owners` (
    `customerID` int not NULL,
    `albumID` int not NULL,
    FOREIGN KEY (`albumID`) REFERENCES `albums` (`albumID`),
    FOREIGN KEY (`customerID`) REFERENCES `users` (`customerID`)
);

--
-- Dumping data for table `album_owners`
--

LOCK TABLES `album_owners` WRITE;
INSERT INTO `album_owners` VALUES (2, 1), (1, 3), (3, 1), (2, 2), (2, 3);
UNLOCK TABLES;

--
-- Table structure for table `order_contents`
--

DROP TABLE IF EXISTS `order_contents`;
CREATE TABLE `order_contents` (
    `orderID` int not NULL,
    `albumID` int not NULL,
    FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
    FOREIGN KEY (`albumID`) REFERENCES `albums` (`albumID`)
);

--
-- Dumping data for table `order_contents`
--

LOCK TABLES `order_contents` WRITE;
INSERT INTO `order_contents` VALUES (1, 1), (2, 3), (3, 1), (4, 1), (4, 2);
UNLOCK TABLES;
