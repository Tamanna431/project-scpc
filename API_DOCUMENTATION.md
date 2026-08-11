# SCIC Backend REST API Documentation

This document describes the API endpoints, HTTP methods, request bodies, response formats, and status codes for the SCIC backend.

## Base URL
`http://localhost:5000`

## Headers
For protected endpoints, include the JWT token in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication (`/api/auth`)

### Register User
* **Endpoint:** `/api/auth/register`
* **Method:** `POST`
* **Description:** Registers a new user account.
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "USER",
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z"
    }
  }
  ```
* **Error Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "message": "User already exists with this email",
    "data": null
  }
  ```

### User Login
* **Endpoint:** `/api/auth/login`
* **Method:** `POST`
* **Description:** Authenticates a user and returns a JWT token.
* **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "USER",
        "isDeleted": false,
        "createdAt": "2026-08-11T13:40:00.000Z",
        "updatedAt": "2026-08-11T13:40:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
* **Error Response (401 Unauthorized):**
  ```json
  {
    "success": false,
    "message": "Invalid email or password",
    "data": null
  }
  ```

---

## 2. Users (`/api/users`) - *All endpoints require Authentication*

### Create User (Admin action / Manual user seeding)
* **Endpoint:** `/api/users`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "adminpassword123",
    "role": "ADMIN"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "id": 2,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "ADMIN",
      "isDeleted": false,
      "createdAt": "2026-08-11T13:42:00.000Z",
      "updatedAt": "2026-08-11T13:42:00.000Z"
    }
  }
  ```

### Get All Users
* **Endpoint:** `/api/users`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "USER",
        "isDeleted": false,
        "createdAt": "2026-08-11T13:40:00.000Z",
        "updatedAt": "2026-08-11T13:40:00.000Z"
      }
    ]
  }
  ```

### Get User By ID
* **Endpoint:** `/api/users/:id`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User retrieved successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "USER",
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z"
    }
  }
  ```
* **Error Response (404 Not Found):**
  ```json
  {
    "success": false,
    "message": "User not found",
    "data": null
  }
  ```

### Update User
* **Endpoint:** `/api/users/:id`
* **Method:** `PATCH`
* **Request Body (all fields optional):**
  ```json
  {
    "name": "John Updated",
    "role": "ADMIN"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "id": 1,
      "name": "John Updated",
      "email": "john.doe@example.com",
      "role": "ADMIN",
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:45:00.000Z"
    }
  }
  ```

### Delete User (Soft Delete)
* **Endpoint:** `/api/users/:id`
* **Method:** `DELETE`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User deleted successfully",
    "data": null
  }
  ```

---

## 3. Categories (`/api/categories`)

### Create Category - *Requires Authentication*
* **Endpoint:** `/api/categories`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "Electronics",
    "description": "Electronic gadgets and devices"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Category created successfully",
    "data": {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic gadgets and devices",
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z"
    }
  }
  ```

### Get All Categories
* **Endpoint:** `/api/categories`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [...]
  }
  ```

### Get Category By ID
* **Endpoint:** `/api/categories/:id`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Category retrieved successfully",
    "data": {...}
  }
  ```

### Update Category - *Requires Authentication*
* **Endpoint:** `/api/categories/:id`
* **Method:** `PATCH`
* **Request Body:**
  ```json
  {
    "description": "Updated gadgets description"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Category updated successfully",
    "data": {...}
  }
  ```

### Delete Category - *Requires Authentication*
* **Endpoint:** `/api/categories/:id`
* **Method:** `DELETE`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Category deleted successfully",
    "data": null
  }
  ```

---

## 4. Products (`/api/products`)

### Create Product - *Requires Authentication*
* **Endpoint:** `/api/products`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "name": "Smartphone X",
    "description": "High-end smartphone",
    "price": 999.99,
    "stock": 50,
    "categoryId": 1
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": {
      "id": 1,
      "name": "Smartphone X",
      "description": "High-end smartphone",
      "price": 999.99,
      "stock": 50,
      "status": "ACTIVE",
      "isDeleted": false,
      "categoryId": 1,
      "userId": 1,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z",
      "category": {
        "id": 1,
        "name": "Electronics"
      }
    }
  }
  ```

### Get All Products
* **Endpoint:** `/api/products`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Products retrieved successfully",
    "data": [...]
  }
  ```

### Get Product By ID
* **Endpoint:** `/api/products/:id`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Product retrieved successfully",
    "data": {...}
  }
  ```

### Update Product - *Requires Authentication*
* **Endpoint:** `/api/products/:id`
* **Method:** `PATCH`
* **Request Body (all fields optional):**
  ```json
  {
    "price": 899.99,
    "stock": 45
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "data": {...}
  }
  ```

### Delete Product (Soft Delete) - *Requires Authentication*
* **Endpoint:** `/api/products/:id`
* **Method:** `DELETE`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Product deleted successfully",
    "data": null
  }
  ```

---

## 5. Reviews (`/api/reviews`)

### Create Review - *Requires Authentication*
* **Endpoint:** `/api/reviews`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "rating": 5,
    "comment": "Excellent smartphone! Fast delivery.",
    "productId": 1
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Review created successfully",
    "data": {
      "id": 1,
      "rating": 5,
      "comment": "Excellent smartphone! Fast delivery.",
      "userId": 1,
      "productId": 1,
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "product": {
        "id": 1,
        "name": "Smartphone X"
      }
    }
  }
  ```

### Get All Reviews
* **Endpoint:** `/api/reviews`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Reviews retrieved successfully",
    "data": [...]
  }
  ```

### Get Review By ID
* **Endpoint:** `/api/reviews/:id`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Review retrieved successfully",
    "data": {...}
  }
  ```

### Update Review - *Requires Authentication*
* **Endpoint:** `/api/reviews/:id`
* **Method:** `PATCH`
* **Request Body (all fields optional):**
  ```json
  {
    "rating": 4,
    "comment": "Good phone but a bit expensive."
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Review updated successfully",
    "data": {...}
  }
  ```

### Delete Review - *Requires Authentication*
* **Endpoint:** `/api/reviews/:id`
* **Method:** `DELETE`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Review deleted successfully",
    "data": null
  }
  ```

---

## 6. Orders (`/api/orders`) - *All endpoints require Authentication*

### Create Order
* **Endpoint:** `/api/orders`
* **Method:** `POST`
* **Description:** Places a new order and decrements product stock.
* **Request Body:**
  ```json
  {
    "quantity": 2,
    "productId": 1
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "data": {
      "id": 1,
      "status": "PENDING",
      "quantity": 2,
      "userId": 1,
      "productId": 1,
      "isDeleted": false,
      "createdAt": "2026-08-11T13:40:00.000Z",
      "updatedAt": "2026-08-11T13:40:00.000Z",
      "product": {
        "id": 1,
        "name": "Smartphone X",
        "price": 999.99,
        "stock": 48
      }
    }
  }
  ```
* **Error Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "message": "Insufficient stock",
    "data": null
  }
  ```

### Get All Orders
* **Endpoint:** `/api/orders`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Orders retrieved successfully",
    "data": [...]
  }
  ```

### Get Order By ID
* **Endpoint:** `/api/orders/:id`
* **Method:** `GET`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Order retrieved successfully",
    "data": {...}
  }
  ```

### Update Order Status
* **Endpoint:** `/api/orders/:id`
* **Method:** `PATCH`
* **Request Body:**
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
  *(Status enums allowed: `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`)*
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Order updated successfully",
    "data": {...}
  }
  ```

### Delete Order (Soft Delete)
* **Endpoint:** `/api/orders/:id`
* **Method:** `DELETE`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Order deleted successfully",
    "data": null
  }
  ```
