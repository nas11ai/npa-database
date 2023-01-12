# Dokumentasi API NPA

API ini dibuat menggunakan teknologi berikut:

1. Express.js
2. MySQL
3. Sequelize

## Endpoint

http://localhost:3001

# User

## Register

- ### URL
  - /users/register
- ### Method
  - POST
- ### Request Body Example
  - Username pengguna itu _unique_
  - Setiap pengguna hanya bisa mempunyai salah satu dari 3 role, yaitu (superadmin)/(admin)/(user)
  ```json
  {
    "username": "root",
    "fullname": "tes123",
    "role": "superadmin",
    "password": "forgetitatyourownrisk"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "error": false,
      "message": "Registration success"
    }
    ```
  - Error response:
    ```json
    {
      "error": true,
      "name": "RegistrationError",
      "message": "Invalid role"
    }
    ```

## Login

- ### URL
  - /users/login
- ### Method
  - POST
- ### Request Body Example
  ```json
  {
    "username": "root",
    "password": "forgetitatyourownrisk"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "error": false,
      "message": "Login success",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzUxODk2NCwiZXhwIjoxNjczNTIyNTY0LCJhdWQiOiJucGEuY29tIiwiaXNzIjoiYXBpLm5wYS5jb20ifQ.dVYNU4-7RVek8HaWqIKTCXD_djGOY9AXQ-IdJoPJO04"
    }
    ```
  - Error response:
    ```json
    {
      "error": true,
      "name": "LoginError",
      "message": "Invalid username or password"
    }
    ```

## Refresh Token

- ### URL
  - /users/refresh_token
- ### Method
  - POST
- ### Response
  - Expected output jika access token sudah expired:
    ```json
    {
      "error": false,
      "message": "New access token has been created",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzQ1NDY4NywiZXhwIjoxNjczNDU4Mjg3LCJhdWQiOiJucGEuY29tIiwiaXNzIjoiYXBpLm5wYS5jb20ifQ.3mPTHUm1W9m2ZFHBAty_s77-YXMaVIuRCfszHfaJYlE"
    }
    ```
  - Expected output jika access token belum expired:
    ```json
    {
      "error": false,
      "message": "Access token has not expired yet",
      "access_token": ""
    }
    ```
  - Error response:
    ```json
    {
      "error": true,
      "name": "MissingToken",
      "message": "Missing refresh token"
    }
    ```
