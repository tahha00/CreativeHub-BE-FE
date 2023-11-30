DROP TABLE IF EXISTS class_photo;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE venue (
    venue_id INT GENERATED ALWAYS AS IDENTITY,
    class_id INT GENERATED ALWAYS AS IDENTITY,
    venue_name VARCHAR(50) UNIQUE NOT NULL,
    venue_address VARCHAR(100) UNIQUE NOT NULL,
    disabled_access BOOLEAN NOT NULL,
    PRIMARY KEY (venue_id)
);

CREATE TABLE class (
    class_id INT GENERATED ALWAYS AS IDENTITY,
    class_name VARCHAR(50),
    venue_id INT NOT NULL,
    start_time TIME NOT NULL, 
    finish_time TIME NOT NULL, 
    price FLOAT NOT NULL, 
    over18 BOOLEAN DEFAULT FALSE,
    class_date VARCHAR(50),
    teacher VARCHAR(50),
    contact_phone BIGINT NOT NULL, 
    contact_email VARCHAR(50),
    PRIMARY KEY (class_id),
    FOREIGN KEY (venue_id) REFERENCES venue("venue_id")
);

CREATE TABLE review (
    review_id INT GENERATED ALWAYS AS IDENTITY,
    review_text VARCHAR(300) NOT NULL, 
    PRIMARY KEY (review_id)
   
);

CREATE TABLE booking (
    booking_id INT GENERATED ALWAYS AS IDENTITY,
    class_id INT NOT NULL, 
    user_id INT NOT NULL, 
    class_time VARCHAR(50), 
    PRIMARY KEY (booking_id),
    FOREIGN KEY (class_id) REFERENCES class("class_id"),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE class_photo (
    photo_id INT GENERATED ALWAYS AS IDENTITY,
    photo_url VARCHAR(100),
    class_id INT NOT NULL, 
    PRIMARY KEY (photo_id),
    FOREIGN KEY (class_id) REFERENCES class("class_id")
);

INSERT INTO venue (venue_name, venue_address, disabled_access)
VALUES 
    ('Florin Town Hall', 'Florin Town Hall, Main Street, Florin Town, FL20 FTH', TRUE),
    ('Florin Secondary School', 'Florin Secondary School, School Street, Florin Town, FL19 FSS', TRUE),
    ('Florin County Library', 'Florin County Library, Book Street, Florin Town, FL18 WLB', TRUE),
    ('The Crafts Centre', 'The Crafts Centre, Painting Lane, The Fields, FL02 VVR', FALSE), 
    ('Florin Historical Centre', 'Florin Historical Centre, Old lane, The Wilderness, FL66 VOS', FALSE);

INSERT INTO class (
    class_name, venue_id, start_time, finish_time, price, over18, class_date, teacher, contact_phone, contact_email
)
VALUES 
    ('Pottery Mondays', 1, '18:00:00', '20:00:00', 5, FALSE, 'Every_Monday', 'Steve', 47586747495, 'steve@florincrafts.com'),
    ('Jewellery Tuesdays', 2, '18:00:00', '20:00:00', 5, FALSE, 'Every_Tuesday', 'Karina', 47586747495, 'karina@florincrafts.com'),
    ('Woodwork Wednesdays', 3, '18:00:00', '20:00:00', 5, FALSE, 'Every_Wednesday', 'Karina', 47586747495, 'karina@florincrafts.com');


INSERT INTO user_account (username, password) 
VALUES ('Ale', 'fines');

INSERT INTO booking (class_id, user_id, class_time)
VALUES
(1, 1, 'Time: 18:00:00 - 20:00:00'),
(2, 1, 'Time: 18:00:00 - 20:00:00');
