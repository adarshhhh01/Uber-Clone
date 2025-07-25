# Users Endpoint Documentation

## Register Endpoint

**POST** `/users/register`

### Description

This endpoint registers a new user. Upon successful registration, it returns an authentication token along with the created user object.

### Request Data

The request must be sent as a JSON object with the following structure:

```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
}
```

#### Field Details

- **fullName.firstName** (string): _Required._ Must be at least 2 characters long.
- **fullName.lastName** (string): _Required._ Provide the user's last name.
- **email** (string): _Required._ Must be a valid email address.
- **password** (string): _Required._ Must be at least 8 characters long.

### Responses

#### Success

- **Status Code:** 201 Created
- **Response Body:**

```json
{
  "token": "your_generated_token",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
    // Additional user fields if applicable
  }
}
```

#### Error: Bad Request

- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "First name must be at least 2 characters long",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Password must be at least 8 characters long",
      "param": "password",
      "location": "body"
    }
    // Other validation errors if applicable
  ]
}
```

#### Other Errors

- **500 Internal Server Error:** Indicates an unexpected error during processing.

### Usage Example (Register)

#### cURL

```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}'
```

---

## Login Endpoint

**POST** `/users/login`

### Description

This endpoint authenticates an existing user. On a successful login, it returns an authentication token and the user object.

### Request Data

The request must be sent as a JSON object with the following structure:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Field Details

- **email** (string): _Required._ Must be a valid email address.
- **password** (string): _Required._ Must be at least 8 characters long.

### Responses

#### Success

- **Status Code:** 200 OK
- **Response Body:**

```json
{
  "token": "your_generated_token",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
    // Additional user fields if applicable
  }
}
```

#### Error: Unauthorized or Bad Request

- **Status Code:** 400 Bad Request or 401 Unauthorized
- **Response Body:**

```json
{
  "message": "Invalid credentials"
}
```

#### Other Errors

- **500 Internal Server Error:** Indicates an unexpected error during processing.

### Usage Example (Login)

#### cURL

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

---

## Profile Endpoint

**GET** `/users/profile`

### Description

This endpoint returns the profile of the authenticated user. It requires an authorization token to be included in the request headers or cookies.

### Authentication

- **Headers:**  
  `Authorization: Bearer your_generated_token`

### Responses

#### Success

- **Status Code:** 200 OK
- **Response Body:** The user object containing user details.

```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
  // Additional user fields if applicable
}
```

#### Error: Unauthorized

- **Status Code:** 401 Unauthorized
- **Response Body:**

```json
{
  "message": "Not authorized"
}
```

### Usage Example (Profile)

#### cURL

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer your_generated_token"
```

---

## Logout Endpoint

**GET** `/users/logout`

### Description

This endpoint logs out the authenticated user by clearing the authentication token cookie and adding the token to a blacklist.

### Authentication

- **Headers:**  
  `Authorization: Bearer your_generated_token`

OR via cookies if the token is stored in the client's cookie.

### Responses

#### Success

- **Status Code:** 200 OK
- **Response Body:**

```json
{
  "message": "Logged out successfully"
}
```

#### Error: Unauthorized

- **Status Code:** 401 Unauthorized
- **Response Body:**

```json
{
  "message": "Not authorized"
}
```

### Usage Example (Logout)

#### cURL

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer your_generated_token"
```

---

## Notes

- The server runs by default on [http://localhost:3000](http://localhost:3000). Adjust the port using the `.env` file or server configuration if needed.
- Ensure that the request payload matches the expected format.