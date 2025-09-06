# Lab CRUD API
Built with Node.js, Express.js, and MySQL.
Uses dotenv for environment variables.
Implements CRUD (Create, Read, Update, Delete) for students and courses.
Tested using Postman.

Clone repository:
git clone https://github.com/<username>/lab-crud-api.git
cd lab-crud-api

npm install

Setup MySQL Database
Open phpMyAdmin (from XAMPP).
Create a database (example: school).

Run these queries:
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT NOT NULL
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  units INT NOT NULL
);

Setup environment variables
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=school
PORT=5000

Run server: npx nodemon server.js

ENDPOINTS

Students:

POST /api/students → Create a new student
GET /api/students → List all students
GET /api/students/:id → Get a student by ID
PUT /api/students/:id → Update a student
DELETE /api/students/:id → Delete a student

Courses (Supplemental):

POST /api/courses → Create a new course
GET /api/courses → List all courses
GET /api/courses/:id → Get a course by ID
PUT /api/courses/:id → Update a course
DELETE /api/courses/:id → Delete a course
