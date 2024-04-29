DROP DATABASE IF EXISTS movie_tickets_system;
CREATE DATABASE movie_tickets_system;
USE movie_tickets_system;


CREATE TABLE movie (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    language VARCHAR(11) NOT NULL,
    duration INT NOT NULL,
    PRIMARY KEY (id)
);

-- MOVIE MOCK DATA

INSERT INTO movie (title, genre, language, duration) 
VALUES 
	( 'Spiderman', 'Fantastic', 'english', 93),
	( 'The Dark Knight', 'Action', 'english', 152),
	( 'Inception', 'Thriller', 'russian', 148),
	( 'The Shawshank Redemption', 'Drama', 'english', 142),
	( 'Interstellar', 'Sci-Fi', 'korean', 169);


CREATE TABLE ticket (
    id INT NOT NULL AUTO_INCREMENT,
    seat_number VARCHAR(4) NOT NULL,
    price DECIMAL(10, 2) not null,
    fk_movie_id INT NOT NULL,
    type ENUM('front', 'middle', 'balcony') NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(fk_movie_id) REFERENCES movie(id)
);

-- TICKET MOCK DATA

INSERT INTO ticket (seat_number, price, fk_movie_id, type) 
VALUES 
	( '23', '32', 1, 'front'),
    ( '47', '22', 1, 'middle'),
	( '53', '22', 2, 'middle'),
	( '93', '12', 1, 'balcony'),
	( '104', '12', 4, 'balcony'),
	( '57', '22', 5, 'middle');

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    PRIMARY KEY (id),
    UNIQUE (username)
);
-- USER MOCK DATA

INSERT INTO user (username, firstname, lastname, age, email, password, phone)
VALUES 
    ('john12', 'John', 'Doe', 21, 'john12@gmail.com', '1234', '123-456-7890'),
    ('jane32', 'Jane', 'Smith', 24, 'jane32@gmail.com', '1234', '987-654-3210'),
    ('alice_', 'Alice', 'Johnson', 65, 'alice_here@gmail.com', '1234', '456-789-0123'),
    ('bob#', 'Bob', 'Brown', 32, 'bob@gmail.com', '1234', '789-012-3456'),
    ('iamemily', 'Emily', 'Davis', 17, 'iamemily@gmail.com', '1234', '012-345-6789');

CREATE TABLE schedule (
    id INT NOT NULL AUTO_INCREMENT,
    time TIME NOT NULL,
    date DATE NOT NULL,
    seats_remaining INT CHECK (seats_remaining >= 0),
    fk_movie_id INT NOT NULL,
    fk_theater INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_movie_id) REFERENCES movie(id)
);

INSERT INTO schedule ( time, date, seats_remaining, fk_movie_id, fk_theater)
VALUES
    ( '10:00', '2024-04-05', 100, 1, 1),
    ( '13:00', '2024-04-05', 120, 2, 2), 
    ( '15:30', '2024-04-06', 80, 1, 1),  
    ( '18:00', '2024-04-06', 90, 3, 2),  
    ( '20:30', '2024-04-07', 110, 2, 1);

CREATE TABLE purchase (
 id INT NOT NULL AUTO_INCREMENT,
    card_number VARCHAR(16) NOT NULL,
    card_name VARCHAR(255) NOT NULL,
    number_of_tickets INT NOT NULL,
    total_cost INT NOT NULL,
    status ENUM('completed', 'cancelled') NOT NULL,
    fk_ticket_id INT NOT NULL,
    fk_user_id INT NOT NULL,
    fk_schedule_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_ticket_id) REFERENCES ticket (id),
    FOREIGN KEY(fk_user_id) REFERENCES user (id),
    FOREIGN KEY(fk_schedule_id) REFERENCES schedule (id)
);


CREATE TABLE theater (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO theater (name)
VALUES
    ( 'Theater A'), 
    ( 'Theater B'), 
    ( 'Theater C'), 
    ( 'Theater D'), 
    ( 'Theater E');