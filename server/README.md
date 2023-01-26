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

- Description:

  - Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa diakses

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

# Property.Area

- Merupakan API berkaitan dengan zona atau lokasi properti
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa diakses

## Add new area

- Description:

  - Berfungsi untuk menambahkan data `region_name` baru

- ### URL
  - /property/areas/create
- ### Method
  - POST
- ### Request Body Example
  ```json
  {
    "region_name": "Ancol"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "property_areas",
        "attributes": null
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 3:13:39 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "region_name": "region_name must not be blank"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:09:16 PM"
      }
    }
    ```

## Get all `Property Area`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Area` yang terdaftar di dalam database
- ### URL
  - /property/areas/read
- ### Method
  - GET
- ### Request Body Example
  ```txt
  Empty Body Request
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 200,
      "status": "OK",
      "data": {
        "type": "property_areas",
        "attributes": [
          {
            "id": 1,
            "regionName": "Ampera",
            "createdAt": "2023-01-26T09:56:14.000Z",
            "updatedAt": "2023-01-26T09:56:14.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 1:56:52 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 401,
      "status": "UNAUTHORIZED",
      "errors": {
        "access_token": "access token has expired"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Get specific region name

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Area` sesuai dengan `region_name` yang diinginkan
  - Membutuhkan `query parameter` berupa `region_name` dengan tipe data `string`. Contoh: `BASE_URL/property/areas/read?region_name=Ampera`
- ### URL
  - /property/areas/read
- ### Method
  - GET
- ### Request Body Example
  ```txt
  Empty Body Request
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 200,
      "status": "OK",
      "data": {
        "type": "property_areas",
        "attributes": [
          {
            "id": 1,
            "regionName": "Ampera",
            "createdAt": "2023-01-26T09:56:14.000Z",
            "updatedAt": "2023-01-26T09:56:14.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 1:56:52 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "region_name": "region_name not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Get specific `Property Area` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Area` sesuai dengan `id` yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh: `BASE_URL/property/areas/read/1`
- ### URL
  - /property/areas/read
- ### Method
  - GET
- ### Request Body Example
  ```txt
  Empty Body Request
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 200,
      "status": "OK",
      "data": {
        "type": "property_areas",
        "attributes": {
          "id": 1,
          "regionName": "Ampera",
          "createdAt": "2023-01-26T09:56:14.000Z",
          "updatedAt": "2023-01-26T09:56:14.000Z"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 1:56:52 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "id": "id must be an integer,id must not be null"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Update region name

- Description:
  - Berfungsi untuk mengubah data `region_name` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh: `BASE_URL/property/areas/update/1`
  - Perlu body request berupa `region_name` baru yang akan mengubah data `Property Area` yang sudah terdaftar
- ### URL
  - /property/areas/update/:id
- ### Method
  - PUT
- ### Request Body Example
  ```json
  {
    "new_region_name": "Bekasi"
  }
  ```
- ### Response
  - Expected output:
    ```txt
    Return 204 No Content and Empty Body Response
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "id": "id must be an integer,id must not be null"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Delete specific `Property Area` by id

- Description:
  - Berfungsi untuk menghapus satu data `Property Area` sesuai dengan `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh: `BASE_URL/property/areas/delete/1`
- ### URL
  - /property/areas/delete/:id
- ### Method
  - DELETE
- ### Request Body Example
  ```txt
  Empty Body Request
  ```
- ### Response
  - Expected output:
    ```txt
    Return 204 No Content and Empty Body Response
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "id": "id must be an integer,id must not be null"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```
