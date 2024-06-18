# Stuuse

App displaying free hours, offers and events for students.

## Table of contents
* [Prerequisites](#prerequisites)
* [Java JDK 17 Download](#java-jdk-17-download)
* [Database Setup](#database-setup)
* [Run backend application](#run-backend-application)
* [Run frontend application](#run-frontend-application)

## Prerequisites

Before you start, make sure you have installed the following on your system:
- Java JDK 17
- Maven
- XAMPP
- IntelliJ IDEA
- Node.js

## Java JDK 17 Download

If you don't have Java JDK 17 installed, you should do so using the following link: https://www.oracle.com/java/technologies/downloads/#java17

## Database Setup

### Step 1: Install XAMPP

Download and install XAMPP from https://www.apachefriends.org/download.html.

### Step 2: Start XAMPP

Run the XAMPP control panel and start the following services:
- Apache
- MySQL

### Step 3: Create the Database

1. Open a web browser and go to `http://localhost/phpmyadmin`.
2. Click on the "Databases" tab.
3. Create a new database named `stuuse` and select `utf8_polish_ci` encoding.

### Step 4: Add sample data to database

1. Go to the `stuuse` database by clicking on it in the left menu.
2. Go to the SQL tab at the top of the page.
3. Add sample data to the tables by executing the following SQL code:
```sql
-- Tworzenie tabel
create table content (content_id bigint not null auto_increment, address varchar(255), description varchar(255), discount_code varchar(255), dislikes integer default 0, image varchar(255), is_verified boolean default false, likes integer default 0, title varchar(255), type_of_content tinyint check (type_of_content between 0 and 1), primary key (content_id));
create table free_hours (hour_id bigint not null auto_increment, date datetime(6), duration varchar(255), faculty varchar(255), is_verified boolean default false, type_of_free_hour tinyint check (type_of_free_hour between 0 and 1), primary key (hour_id));
create table users (user_id bigint not null auto_increment, account_type tinyint check (account_type between 0 and 2), email varchar(255), is_verified boolean default false, lastname varchar(255), login varchar(255), name varchar(255), password varchar(255), primary key (user_id));

-- Dodawanie godzin rektorskich
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-03-16', '11:00 - 12:00', NULL, 0, 1);
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-03-21', '12:00 - 14:00', NULL, 0, 1);
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-05-27', '10:00 - 16:00', NULL, 0, 1);

-- Dodawanie godzin dziekanskich
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-03-21', '11:00 - 14:00', 'WEEIA', 1, 1);
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-04-12', '10:00 - 12:00', 'FTIMS', 1, 1);
INSERT INTO free_hours(date, duration, faculty, type_of_free_hour, is_verified) VALUES('2024-05-22', '12:00 - 16:00', 'WEEIA', 1, 1);

-- Dodawanie uzytkownikow
INSERT INTO users(account_type, name, lastname, email, login, password, is_verified) VALUES(2, 'Jan', 'Kowalski', 'admin@stuuse.pl', 'admin', '$2a$12$3aKufGWc512iFbnNtSd/PeqUSS3R8NSEK7rszUY7.NmiPjCTQmxPW', 1);
-- Haslo do uzytkownika admin: admin

INSERT INTO users(account_type, name, lastname, email, login, password, is_verified) VALUES(0, 'Adam', 'Nowak', 'pl_employee@stuuse.pl', 'employee1', '$2a$12$rNH9vWlqeSWSgi.yhtjzrO5BgTMl1pzhK4AeMjMTaI/VDAtvMoljy', 1);
-- Haslo do uzytkownika employee1: Employee1

INSERT INTO users(account_type, name, lastname, email, login, password, is_verified) VALUES(1, 'Kacper', 'Nowacki', 'third_party_company@stuuse.pl', 'company1', '2a$12$wo0JdjtFGfkeuuNmCxDNI.ECRsJ1FrP9jEMEqb9U2AtzKTgy9lijO', 1);
-- Haslo do uzytkownika company1: Company1

INSERT INTO users(account_type, name, lastname, email, login, password, is_verified) VALUES(1, 'Adam', 'Adamowski', 'third_party_company2@stuuse.pl', 'company2', '$2a$12$6WUe9Rkgx9qXDmf2XS3YcevAdjWWxU59thWJAognO3WlJddc3KWxC', 0);
-- Haslo do uzytkownika company2: Company2

-- Dodawanie wydarzen
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('Juwenalia Łódź', 'Rolna 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR1wKQwpY-5AwteWx6gqsSMBXT-iq07pZypp2PqJ_zw&s', NULL, 0, 1);
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('Yapa Łódź', 'Rolna 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'https://yapa.art.pl/2024/wp-content/uploads/2024/02/Yapa-2024-pop-ma%C5%82y.jpg', NULL, 0, 1);
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('Juwenalia Łódź', 'Rolna 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR1wKQwpY-5AwteWx6gqsSMBXT-iq07pZypp2PqJ_zw&s', NULL, 0, 1);
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('Yapa Łódź', 'Rolna 9', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'https://yapa.art.pl/2024/wp-content/uploads/2024/02/Yapa-2024-pop-ma%C5%82y.jpg', NULL, 0, 0);

-- Dodawanie ofert specjalnych
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('KFC', 'al. Jana Pawła II 28, 93-570 Łódź',
                   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum lacus eget dolor lobortis porta.', 'https://galeriamazovia.com.pl/wp-content/uploads/2024/03/900x900-wings.jpg', 'ABCDEF', 1, 1);
INSERT INTO content(title, address, description, image, discount_code, type_of_content, is_verified) VALUES('McDonalds', 'al. Adama Mickiewicza 5, 90-443 Łódź',
                   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum lacus eget dolor lobortis porta.', 'https://pliki.horecatrends.pl/i/02/42/57/024257_r2_940.jpg', 'ABCDEF', 1, 1);
```

## Run backend application

### Using IntelliJ IDEA:

1. Open IntelliJ IDEA.
2. Click: File -> Open and select `stuuse-backend` folder.
3. After setting up the application, click `Run 'StuuseBackendApplication'` at the top (Make sure you have Apache and MySQL server enabled in XAMPP).

## Run frontend application

### Step 1: Install Node.js

1. Open a web browser and go to https://nodejs.org/en/download
2. Download and install Node.js

### Step 2: Install react-scripts

1. Go to `stuuse-frontend` folder in CMD or Linux Shell.
2. Input command `npm install react-scripts --save` to install node_modules folder.

### Step 3: Run the application

1. Input command `npm start` to run the application.

