# Library Management System API

## Overview
The Library Management System API provides endpoints for managing books and users in a library. It allows public access to book listings and searches while restricting certain functionalities to registered users and administrators.

## Features
- Publicly accessible API for retrieving available books and searching for books.
- Admin-restricted API for user management and book management.
- User authentication with signup and login functionality.

## Endpoints

### Public Endpoints
- **GET `/api/books`** - Retrieve all books currently available in the library.
- **GET `/api/search`** - Search for books using keywords.
- **POST `/signup`** - Register a new user.
- **POST `/login`** - Authenticate and log in a user.

### User Endpoints (Requires Authentication)
- **GET `/books`** - Retrieve all books (for registered users).
- **GET `/books/{bookId}`** - Retrieve a specific book (for registered users and admins).

### Admin Endpoints (Requires Admin Authentication)
- **GET `/users`** - Retrieve all users.
- **DELETE `/delete`** - Delete a user.
- **POST `/api/books`** - Add a new book.
- **DELETE `/books/{bookId}`** - Delete a book.
- **PUT `/books/{bookId}`** - Update a book.

## Usage Example
Base URL: `http://localhost:5000`

### Fetch All Books (Public Access)
```sh
GET http://localhost:5000/api/books
```

### Search for Books (Public Access)
```sh
GET http://localhost:5000/api/search?query=Harry+Potter
```

### Sign Up
```sh
POST http://localhost:5000/signup
Content-Type: application/json

{
  "firstname": "john",
  "lastname": "doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Login 
```sh
POST http://localhost:5000/signup
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Admin: Create a Book
```sh
POST http://localhost:5000/api/books
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "New Book",
  "author": "Author Name",
  "genre": "Fiction",
  "published_year": 2024,
  "available_copies": 10
}
```

## How to Use for Developers
- Clone the repository:
  ```sh
  git clone MYWORKSPACE
  ```
- Navigate into the project directory:
  ```sh
  cd Library_management
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Start the server:
  ```sh
  npm start
  ```
- The server will listen on `http://localhost:5000`

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.