# Dokumentasi API NPA

API ini dibuat menggunakan teknologi berikut:

1. Express.js
2. MySQL
3. Sequelize

## API Version

- 1.0

## Endpoint

https://npa-database-production.up.railway.app

# User

## Register

- ### URL
  - /users/register
- ### Method
  - POST
- ### Request Body Example
  - `username` pengguna harus _unique_
  - `username`, `fullname`, `role`, dan `password` harus diisi
  - Setiap pengguna hanya bisa mempunyai salah satu dari 3 `role`, yaitu (`superadmin`)/(`admin`)/(`user`)
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
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "users",
        "attributes": null
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:11:24 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "username": "username has been taken"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 9:45:05 PM"
      }
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
      "code": 200,
      "status": "OK",
      "data": {
        "type": "bearer_token",
        "attributes": {
          "user_role": "superadmin",
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY3NDM5NjY4NCwiZXhwIjoxNjc0Mzk2Njk5LCJhdWQiOiJucGEuY29tIiwiaXNzIjoiYXBpLm5wYS5jb20ifQ.eBw_3B2MGCFMa6IRIOm_ff_DWf8i29fy3mRMPlP3t_Y"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:11:24 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "password": "password is wrong"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:52:34 PM"
      }
    }
    ```

## Refresh Token

- ### URL
  - /users/refresh_token
- ### Method
  - GET
- ### Response
  - Expected output jika access token sudah expired:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "bearer_token",
        "attributes": {
          "user_role": "superadmin",
          "new_access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTY3NDM5OTI2OSwiZXhwIjoxNjc0Mzk5Mjg0LCJhdWQiOiJucGEuY29tIiwiaXNzIjoiYXBpLm5wYS5jb20ifQ.lC3IsB64pQUFLRf3RAi9l_bF8ky_X0VObTtqii7zgao"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:54:29 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 401,
      "status": "UNAUTHORIZED",
      "errors": {
        "refresh_token": "refresh token is missing"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
      }
    }
    ```

## Logout

- ### URL
  - /users/logout
- ### Method
  - GET
- ### Response
  - Expected output jika access token sudah expired:
    ```json
    {
      "code": 200,
      "status": "OK",
      "data": {
        "type": "logout",
        "attributes": null
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:54:29 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 401,
      "status": "UNAUTHORIZED",
      "errors": {
        "access_token": "invalid signature"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/23/2023, 2:26:38 PM"
      }
    }
    ```
