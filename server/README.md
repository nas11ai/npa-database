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
  - Setiap pengguna hanya bisa mempunyai salah satu dari 3 `role`, yaitu
    (`superadmin`)/(`admin`)/(`user`)
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

## Access Token

- ### Description:

  - Membutuhkan `Authorization` Header berisikan `bearer token`

- ### URL
  - /users/access_token
- ### Method
  - GET
- ### Response
  - Expected output jika access token sudah expired:
    ```txt
    Return 204 No Content and Empty Body Response
    ```
  - Error response:
    ```json
    {
      "code": 401,
      "status": "UNAUTHORIZED",
      "errors": {
        "access_token": "access token is missing"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
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

  - Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
    diakses

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
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

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
  - Berfungsi untuk mengembalikan seluruh data `Property Area` yang terdaftar di
    dalam database
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
  - Berfungsi untuk mengembalikan seluruh data `Property Area` sesuai dengan
    `region_name` yang diinginkan
  - Membutuhkan `query parameter` berupa `region_name` dengan tipe data
    `string`. Contoh: `BASE_URL/property/areas/read?region_name=Ampera`
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
  - Berfungsi untuk mengembalikan satu data `Property Area` sesuai dengan `id`
    yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/areas/read/1`
- ### URL
  - /property/areas/read/:id
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
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/areas/update/1`
  - Perlu body request berupa `region_name` baru yang akan mengubah data
    `Property Area` yang sudah terdaftar
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
  - Berfungsi untuk menghapus satu data `Property Area` sesuai dengan `id` dari
    database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/areas/delete/1`
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

# Property.PersonInCharge

- Merupakan API berkaitan dengan pemilik properti
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

## Add new person in charge

- Description:

  - Berfungsi untuk menambahkan data `fullname`, `role`, `company`, dan
    `phone_number` baru

- ### URL
  - /property/person_in_charges/create
- ### Method
  - POST
- ### Request Body Example
  ```json
  {
    "fullname": "Andi Muhammad Rezki",
    "role": "Developer",
    "company": "Andi Empire",
    "phone_number": "082144569073"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "property_person_in_charges",
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
        "fullname": "fullname must not be blank"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:09:16 PM"
      }
    }
    ```

## Get all `Property Person In Charge`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Person In Charge` yang
    terdaftar di dalam database
- ### URL
  - /property/person_in_charges/read
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
        "type": "property_person_in_charges",
        "attributes": [
          {
            "id": 1,
            "fullname": "Ibnu Muttaqiem",
            "role": "Management",
            "company": "Noble Asia",
            "phoneNumber": "081917071995",
            "createdAt": "2023-01-28T06:02:40.000Z",
            "updatedAt": "2023-01-28T14:58:39.000Z",
            "deletedAt": null
          },
          {
            "id": 2,
            "fullname": "Andi Muhammad Rezki",
            "role": "Developer",
            "company": "Andi Empire",
            "phoneNumber": "082144569073",
            "createdAt": "2023-01-28T15:10:24.000Z",
            "updatedAt": "2023-01-28T15:21:41.000Z",
            "deletedAt": null
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/28/2023, 11:37:39 PM"
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

## Get specific `Property Person In Charge`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Person In Charge`
    sesuai dengan `role` atau `company` yang diinginkan
- Route Parameter:
  - `role`
    - Contoh: `BASE_URL/property/person_in_charges/read?role=Management`
  - `company`
    - Contoh: `BASE_URL/property/person_in_charges/read?company=Andi Empire`
- ### URL
  - /property/person_in_charges/read
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
        "type": "property_person_in_charges",
        "attributes": [
          {
            "id": 2,
            "fullname": "Andi Muhammad Rezki",
            "role": "Developer",
            "company": "Andi Empire",
            "phoneNumber": "082144569073",
            "createdAt": "2023-01-28T15:10:24.000Z",
            "updatedAt": "2023-01-28T15:21:41.000Z",
            "deletedAt": null
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
        "person_in_charge": "person_in_charge not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Get specific `Property Person In Charge` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Person In Charge` sesuai
    dengan `id` yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/person_in_charges/read/1`
- ### URL
  - /property/person_in_charges/read/:id
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
        "type": "property_person_in_charges",
        "attributes": {
          "id": 2,
          "fullname": "Andi Muhammad Rezki",
          "role": "Developer",
          "company": "Andi Empire",
          "phoneNumber": "082144569073",
          "createdAt": "2023-01-28T15:10:24.000Z",
          "updatedAt": "2023-01-28T15:21:41.000Z",
          "deletedAt": null
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

## Update `Property Person In Charge`

- Description:

  - Berfungsi untuk mengubah data `Property Person In Charge` yang sudah
    terdaftar di tabel
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/person_in_charges/update/1`

- Property yang dapat diubah:
  - `new_fullname`
  - `new_role`
  - `new_company`
  - `new_phone_number`
- ### URL
  - /property/person_in_charges/update/:id
- ### Method
  - PUT
- ### Request Body Example
  ```json
  {
    "new_fullname": "Andi Tornanda Pasaribu"
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

## Delete specific `Property Person In Charge` by id

- Description:
  - Berfungsi untuk menghapus `(soft-delete)` satu data
    `Property Person In Charge` sesuai dengan `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/person_in_charges/delete/1`
- ### URL
  - /property/person_in_charges/delete/:id
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

## Restore specific `Property Person In Charge` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Person In Charge` yang
    sudah terhapus `(soft-delete)` sesuai dengan `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/person_in_charges/restore/1`
- ### URL
  - /property/person_in_charges/restore/:id
- ### Method
  - PUT
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
        "type": "property_person_in_charges",
        "attributes": null
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/28/2023, 11:49:16 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 400,
      "status": "BAD_REQUEST",
      "errors": {
        "person_in_charge": "person_in_charge is not deleted"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/28/2023, 11:26:11 PM"
      }
    }
    ```

# Property.FacilityName

- Merupakan API data jenis fasilitas properti yang terdaftar di database
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

## Add new facility name

- Description:

  - Berfungsi untuk menambahkan data `facilty_name` baru
  - Membutuhkan request body berupa `facility_name` dengan tipe data `string`

- ### URL
  - /property/facility_names/create
- ### Method
  - POST
- ### Request Data

  - #### Content-Type

    ```txt
    multipart/form-data
    ```

  - #### `Required input attribute` `:` `Data type`
    ```ts
    facilityName: string;
    image: object;
    ```

- ### Response
  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "property_facility_names",
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
        "facility_name": "facility_name must not be blank"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:09:16 PM"
      }
    }
    ```

## Get all `Property Facility Name`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Facility Name` yang
    terdaftar di dalam database
- ### URL
  - /property/facility_names/read
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
        "type": "property_facility_names",
        "attributes": [
          {
            "id": 1,
            "facilityName": "Bedroom",
            "createdAt": "2023-01-27T00:07:03.000Z",
            "updatedAt": "2023-01-27T00:07:03.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:20:31 PM"
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

## Get specific facility name

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Facility Name` sesuai
    dengan `facility_name` yang diinginkan
  - Membutuhkan `query parameter` berupa `facility_name` dengan tipe data
    `string`. Contoh:
    `BASE_URL/property/facility_names/read?facility_name=Bedroom`
- ### URL
  - /property/facility_names/read
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
        "type": "property_facility_names",
        "attributes": [
          {
            "id": 1,
            "facilityName": "Bedroom",
            "createdAt": "2023-01-27T00:07:03.000Z",
            "updatedAt": "2023-01-27T00:07:03.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:24:49 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "facility_name": "facility_name not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:25:02 PM"
      }
    }
    ```

## Get specific `Property Facility Name` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Facility Name` sesuai
    dengan `id` yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/facility_names/read/1`
- ### URL
  - /property/facility_names/read/:id
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
        "type": "property_facility_names",
        "attributes": {
          "id": 1,
          "facilityName": "Bedroom",
          "createdAt": "2023-01-27T00:07:03.000Z",
          "updatedAt": "2023-01-27T00:07:03.000Z"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:27:47 PM"
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

## Update facility name

- Description:
  - Berfungsi untuk mengubah data `facility_name` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/facility_names/update/1`
  - Perlu body request berupa `facility_name` baru yang akan mengubah data
    `Property Facility Name` yang sudah terdaftar
- ### URL
  - /property/facility_names/update/:id
- ### Method
  - PUT
- ### Request Data

  - #### Content-Type

    ```txt
    multipart/form-data
    ```

  - #### Optional input attribute `:` `Data type`
    ```ts
    facilityName: string;
    image: object;
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

## Delete specific `Property Facility Name` by id

- Description:
  - Berfungsi untuk menghapus satu data `Property Facility Name` sesuai dengan
    `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/facility_names/delete/1`
- ### URL
  - /property/facility_names/delete/:id
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

# Property.PaymentTerm

- Merupakan API data jenis kesepakatan pembayaran apartemen yang terdaftar di
  database
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

## Add new payment term

- Description:

  - Berfungsi untuk menambahkan data `payment_term` baru
  - Membutuhkan request body berupa `payment_term` dengan tipe data `string`

- ### URL
  - /property/payment_terms/create
- ### Method
  - POST
- ### Request Body Example
  ```json
  {
    "payment_term": "Full in Advance"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "property_payment_terms",
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
        "payment_term": "payment_term must not be blank"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:09:16 PM"
      }
    }
    ```

## Get all `Property Payment Term`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Payment Term` yang
    terdaftar di dalam database
- ### URL
  - /property/payment_terms/read
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
        "type": "property_payment_terms",
        "attributes": [
          {
            "id": 1,
            "paymentTerm": "Fully Advanced",
            "createdAt": "2023-01-27T14:15:30.000Z",
            "updatedAt": "2023-01-27T14:15:30.000Z"
          },
          {
            "id": 2,
            "paymentTerm": "Half in Advance",
            "createdAt": "2023-01-27T15:17:07.000Z",
            "updatedAt": "2023-01-27T15:17:07.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 11:17:15 PM"
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

## Get specific payment term

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Payment Term` sesuai
    dengan `payment_term` yang diinginkan
  - Membutuhkan `query parameter` berupa `payment_term` dengan tipe data
    `string`. Contoh:
    `BASE_URL/property/payment_terms/read?payment_term=Full in Advance`
- ### URL
  - /property/payment_terms/read
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
        "type": "property_payment_terms",
        "attributes": [
          {
            "id": 1,
            "paymentTerm": "Fully Advanced",
            "createdAt": "2023-01-27T14:15:30.000Z",
            "updatedAt": "2023-01-27T14:15:30.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:24:49 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "payment_term": "payment_term not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:25:02 PM"
      }
    }
    ```

## Get specific `Property Payment Term` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Payment Term` sesuai
    dengan `id` yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/payment_terms/read/1`
- ### URL
  - /property/payment_terms/read/:id
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
        "type": "property_payment_terms",
        "attributes": {
          "id": 1,
          "paymentTerm": "Full in Advance",
          "createdAt": "2023-01-27T14:15:30.000Z",
          "updatedAt": "2023-01-27T14:15:30.000Z"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:27:47 PM"
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

## Update apartment payment term

- Description:
  - Berfungsi untuk mengubah data `payment_term` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/payment_terms/update/1`
  - Perlu body request berupa `payment_term` baru yang akan mengubah data
    `Property Payment Term` yang sudah terdaftar
- ### URL
  - /property/payment_terms/update/:id
- ### Method
  - PUT
- ### Request Body Example
  ```json
  {
    "new_payment_term": "Full in Advance"
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

## Delete specific `Property Payment Term` by id

- Description:
  - Berfungsi untuk menghapus satu data `Property Payment Term` sesuai dengan
    `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/payment_terms/delete/1`
- ### URL
  - /property/payment_terms/delete/:id
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

# Property.IconicPlace

- Merupakan API data tempat yang bisa diakses oleh apartemen yang terdaftar di
  database
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

## Add new place name

- Description:

  - Berfungsi untuk menambahkan data `place_name` baru
  - Membutuhkan request body berupa `place_name` dengan tipe data `string`

- ### URL
  - /property/iconic_places/create
- ### Method
  - POST
- ### Request Body Example
  ```json
  {
    "place_name": "Indomaret"
  }
  ```
- ### Response
  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "property_iconic_places",
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
        "place_name": "place_name must not be blank"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:09:16 PM"
      }
    }
    ```

## Get all `Property Iconic Place`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Iconic Place` yang
    terdaftar di dalam database
- ### URL
  - /property/iconic_places/read
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
        "type": "property_iconic_places",
        "attributes": [
          {
            "id": 1,
            "placeName": "Alfamidi",
            "createdAt": "2023-01-28T04:32:08.000Z",
            "updatedAt": "2023-01-28T04:55:15.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 11:17:15 PM"
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

## Get specific place name

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Property Iconic Place` sesuai
    dengan `place_name` yang diinginkan
  - Membutuhkan `query parameter` berupa `place_name` dengan tipe data `string`.
    Contoh: `BASE_URL/property/iconic_places/read?place_name=Alfamidi`
- ### URL
  - /property/iconic_places/read
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
        "type": "property_iconic_places",
        "attributes": [
          {
            "id": 1,
            "placeName": "Alfamidi",
            "createdAt": "2023-01-28T04:32:08.000Z",
            "updatedAt": "2023-01-28T04:55:15.000Z"
          }
        ]
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:24:49 PM"
      }
    }
    ```
  - Error response:
    ```json
    {
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "place_name": "place_name not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:25:02 PM"
      }
    }
    ```

## Get specific `Property Iconic Place` by id

- Description:
  - Berfungsi untuk mengembalikan satu data `Property Iconic Place` sesuai
    dengan `id` yang terdaftar
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/iconic_places/read/1`
- ### URL
  - /property/iconic_places/read/:id
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
        "type": "property_iconic_places",
        "attributes": {
          "id": 1,
          "placeName": "Alfamidi",
          "createdAt": "2023-01-28T04:32:08.000Z",
          "updatedAt": "2023-01-28T04:55:15.000Z"
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/27/2023, 7:27:47 PM"
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

## Update property place name

- Description:
  - Berfungsi untuk mengubah data `place_name` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/iconic_places/update/1`
  - Perlu body request berupa `place_name` baru yang akan mengubah data
    `Property Iconic Place` yang sudah terdaftar
- ### URL
  - /property/iconic_places/update/:id
- ### Method
  - PUT
- ### Request Body Example
  ```json
  {
    "new_place_name": "Indomaret"
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

## Delete specific `Property Iconic Place` by id

- Description:
  - Berfungsi untuk menghapus satu data `Property Iconic Place` sesuai dengan
    `id` dari database
  - Membutuhkan `route parameter` berupa `id` dalam bentuk `integer`. Contoh:
    `BASE_URL/property/iconic_places/delete/1`
- ### URL
  - /property/iconic_places/delete/:id
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

# Property.Apartment

- Merupakan API data apartemen-apartemen yang terdaftar di database
- Membutuhkan `Authorization` Header berisikan `bearer token` agar API bisa
  diakses

## Add new `Apartement`

- Description:

  - Berfungsi untuk menambahkan data `Apartment` baru

- ### URL
  - /apartment/create
- ### Method
  - POST
- ### Request Data

  - #### Content-Type

    ```txt
    multipart/form-data
    ```

  - #### `Required input attribute` `:` `Data type`

    ```ts
    kodePropar: {
      type: string,
      pattern: /^[A-Z]{1,7}-[0-9]{3}$/
    };
    ```

    ```ts
    name: {
      type: string,
      pattern: /[^a-zA-Z0-9 ]+/
    };
    ```

    ```ts
    picId: number;
    ```

    ```ts
    propertyArea: string;
    ```

  - #### Optional input attribute `:` `Data type`

    - images
      ```ts
      images: object[];
      ```
    - address
      ```ts
      address: {
        type: string,
        pattern: /[^a-zA-Z0-9., ]+/
      };
      ```
    - size
      ```ts
      size: number;
      ```
    - tower
      ```ts
      tower: string;
      ```
    - floor
      ```ts
      floor: string;
      ```
    - furnishing
      ```ts
      furnishing: string[("Fully Furnished", "Semi Furnished", "Unfurnished")];
      ```
    - available
      ```ts
      available: boolean;
      ```
    - remark
      ```ts
      remark: string;
      ```
    - fees
      ```ts
      fees: object;
      ```
      - Jika `fees` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          rentalPrice: number,
          sellPrice: number,
          priceCurrency: {
            type: string[("Rupiah", "US Dollar")],
            required: true
          },
          propertyPaymentTermsName: string,
          leaseTerms: number,
        }
        ```
    - taxFees

      ```ts
      taxFees: object[];
      ```

      - Jika `taxFees` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          taxType: {
            type: string[("Value Added Tax", "Withholding Tax")],
            required: true,
          },
          percentage: {
            type: number,
            required: true,
          },
          includedWithinPrice: {
            type: boolean,
            required: true,
          },
        }
        ```

    - facilities

      ```ts
      facilities: object[];
      ```

      - Jika `facilities` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          propertyFacilityName: {
            type: string,
            required: true,
          },
          type: {
            type: string,
            pattern: /[^a-zA-Z0-9 ]+/,
          },
          unit: number,
        }
        ```

    - accesses
      ```ts
      accesses: object[];
      ```
      - Jika `accesses` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          propertyIconicPlaceName: {
            type: string,
            required: true,
          },
          type: {
            type: string,
            pattern: /[^a-zA-Z0-9 ]+/,
          },
        }
        ```

- ### Response

  - Expected output:
    ```json
    {
      "code": 201,
      "status": "CREATED",
      "data": {
        "type": "apartments",
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
        "kode_propar": "kode_propar must be a string"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/26/2023, 6:43:56 PM"
      }
    }
    ```

## Get all `Apartment`

- Description:
  - Berfungsi untuk mengembalikan seluruh data `Apartment` yang terdaftar di
    dalam database
- ### URL
  - /apartment/read
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
        "type": "apartments",
        "attributes": {
          "current_page": 1,
          "data_count_on_current_page": 11,
          "total_data_count": 11,
          "total_pages": 1,
          "records": [
            {
              "available": "Yes",
              "kodePropar": "AMP-001",
              "name": "Ampera Penthouse",
              "address": "Jl. Palmerah Sel. No.30A",
              "size": 2000,
              "tower": "A",
              "floor": "2A",
              "furnishing": "Fully Furnished",
              "remark": "Unreachable",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "6 month",
                "id": 1,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": {
                  "id": 1,
                  "paymentTerm": "Full in Advance"
                },
                "ApartmentTaxFees": [
                  {
                    "percentage": "5%",
                    "includedWithinPrice": "No",
                    "detail": "5% Value Added Tax NOT included within price",
                    "id": 1,
                    "taxType": "Value Added Tax"
                  },
                  {
                    "percentage": "3%",
                    "includedWithinPrice": "No",
                    "detail": "3% Withholding Tax NOT included within price",
                    "id": 2,
                    "taxType": "Withholding Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 1,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                },
                {
                  "detail": "Private Access to Alfamidi",
                  "id": 2,
                  "type": "Private",
                  "PropertyIconicPlace": {
                    "id": 1,
                    "placeName": "Alfamidi"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 1,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                },
                {
                  "detail": "2 Suite Bathroom",
                  "id": 2,
                  "type": "Suite",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 12,
                    "facilityName": "Bathroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": [
                {
                  "id": 1,
                  "photoPath": "/app/assets/apartment/AMP-001/AMP-001_2023-02-10-06-54-14_a mimir.jpg",
                  "photoUrl": "/static/apartment/AMP-001/AMP-001_2023-02-10-06-54-14_a mimir.jpg"
                },
                {
                  "id": 2,
                  "photoPath": "/app/assets/apartment/AMP-001/AMP-001_2023-02-10-06-54-14_ayaya.jpg",
                  "photoUrl": "/static/apartment/AMP-001/AMP-001_2023-02-10-06-54-14_ayaya.jpg"
                }
              ]
            },
            {
              "available": "Yes",
              "kodePropar": "AMP-002",
              "name": "Ampera Mansion",
              "address": "Jl. Palmerah Sel. No.30A",
              "size": 2000,
              "tower": "A",
              "floor": "2A",
              "furnishing": "Fully Furnished",
              "remark": "Unreachable",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "6 month",
                "id": 2,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": {
                  "id": 1,
                  "paymentTerm": "Full in Advance"
                },
                "ApartmentTaxFees": [
                  {
                    "percentage": "5%",
                    "includedWithinPrice": "No",
                    "detail": "5% Value Added Tax NOT included within price",
                    "id": 3,
                    "taxType": "Value Added Tax"
                  },
                  {
                    "percentage": "3%",
                    "includedWithinPrice": "No",
                    "detail": "3% Withholding Tax NOT included within price",
                    "id": 4,
                    "taxType": "Withholding Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 3,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                },
                {
                  "detail": "Private Access to Alfamidi",
                  "id": 4,
                  "type": "Private",
                  "PropertyIconicPlace": {
                    "id": 1,
                    "placeName": "Alfamidi"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 3,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                },
                {
                  "detail": "2 Suite Bathroom",
                  "id": 4,
                  "type": "Suite",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 12,
                    "facilityName": "Bathroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": [
                {
                  "id": 3,
                  "photoPath": "/app/assets/apartment/AMP-002/AMP-002_2023-02-11-03-18-34_a mimir.jpg",
                  "photoUrl": "/static/apartment/AMP-002/AMP-002_2023-02-11-03-18-34_a mimir.jpg"
                },
                {
                  "id": 4,
                  "photoPath": "/app/assets/apartment/AMP-002/AMP-002_2023-02-11-03-18-34_ayaya.jpg",
                  "photoUrl": "/static/apartment/AMP-002/AMP-002_2023-02-11-03-18-34_ayaya.jpg"
                }
              ]
            },
            {
              "available": "Yes",
              "kodePropar": "AMP-004",
              "name": "Ampera Mansionn",
              "address": "Jl. Palmerah Sel. No.30A",
              "size": 2000,
              "tower": "A",
              "floor": "2A",
              "furnishing": "Fully Furnished",
              "remark": "Unreachable",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "6 month",
                "id": 3,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": {
                  "id": 1,
                  "paymentTerm": "Full in Advance"
                },
                "ApartmentTaxFees": [
                  {
                    "percentage": "5%",
                    "includedWithinPrice": "No",
                    "detail": "5% Value Added Tax NOT included within price",
                    "id": 5,
                    "taxType": "Value Added Tax"
                  },
                  {
                    "percentage": "3%",
                    "includedWithinPrice": "No",
                    "detail": "3% Withholding Tax NOT included within price",
                    "id": 6,
                    "taxType": "Withholding Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 5,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                },
                {
                  "detail": "Private Access to Alfamidi",
                  "id": 6,
                  "type": "Private",
                  "PropertyIconicPlace": {
                    "id": 1,
                    "placeName": "Alfamidi"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 5,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                },
                {
                  "detail": "2 Suite Bathroom",
                  "id": 6,
                  "type": "Suite",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 12,
                    "facilityName": "Bathroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": [
                {
                  "id": 5,
                  "photoPath": "/home/ersankarimi/Documents/test-apps/npa-database/server/assets/apartment/AMP-004/AMP-004_2023-02-14-21-09-42_Screenshot from 2023-02-14 09-14-36.png",
                  "photoUrl": "/static/apartment/AMP-004/AMP-004_2023-02-14-21-09-42_Screenshot from 2023-02-14 09-14-36.png"
                },
                {
                  "id": 6,
                  "photoPath": "/home/ersankarimi/Documents/test-apps/npa-database/server/assets/apartment/AMP-004/AMP-004_2023-02-14-21-09-42_Screenshot from 2023-02-14 09-13-56.png",
                  "photoUrl": "/static/apartment/AMP-004/AMP-004_2023-02-14-21-09-42_Screenshot from 2023-02-14 09-13-56.png"
                }
              ]
            },
            {
              "available": "Yes",
              "kodePropar": "AMPR-001",
              "name": "Sule Mansion",
              "address": "Jalan Tirta Sule",
              "size": 2000,
              "tower": "A",
              "floor": "10A",
              "furnishing": "Semi Furnished",
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "21 month",
                "id": 10,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "200%",
                    "includedWithinPrice": "No",
                    "detail": "200% Value Added Tax included within price",
                    "id": 14,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 10,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 13,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "AMPR-004",
              "name": "Ampera Mansion2",
              "address": "Jl. Palmerah Sel. No.30A",
              "size": 2000,
              "tower": "A",
              "floor": "2A",
              "furnishing": "Fully Furnished",
              "remark": "Unreachable",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "6 month",
                "id": 9,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": {
                  "id": 1,
                  "paymentTerm": "Full in Advance"
                },
                "ApartmentTaxFees": [
                  {
                    "percentage": "5%",
                    "includedWithinPrice": "No",
                    "detail": "5% Value Added Tax NOT included within price",
                    "id": 12,
                    "taxType": "Value Added Tax"
                  },
                  {
                    "percentage": "3%",
                    "includedWithinPrice": "No",
                    "detail": "3% Withholding Tax NOT included within price",
                    "id": 13,
                    "taxType": "Withholding Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 8,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                },
                {
                  "detail": "Private Access to Alfamidi",
                  "id": 9,
                  "type": "Private",
                  "PropertyIconicPlace": {
                    "id": 1,
                    "placeName": "Alfamidi"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 11,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                },
                {
                  "detail": "2 Suite Bathroom",
                  "id": 12,
                  "type": "Suite",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 12,
                    "facilityName": "Bathroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": [
                {
                  "id": 7,
                  "photoPath": "/home/ersankarimi/Documents/test-apps/npa-database/server/assets/apartment/AMPR-004/AMPR-004_2023-02-15-10-24-52_Screenshot from 2023-02-14 10-37-52.png",
                  "photoUrl": "/static/apartment/AMPR-004/AMPR-004_2023-02-15-10-24-52_Screenshot from 2023-02-14 10-37-52.png"
                },
                {
                  "id": 8,
                  "photoPath": "/home/ersankarimi/Documents/test-apps/npa-database/server/assets/apartment/AMPR-004/AMPR-004_2023-02-15-10-24-52_Screenshot from 2023-02-14 10-19-56.png",
                  "photoUrl": "/static/apartment/AMPR-004/AMPR-004_2023-02-15-10-24-52_Screenshot from 2023-02-14 10-19-56.png"
                }
              ]
            },
            {
              "available": "Yes",
              "kodePropar": "AMPR-005",
              "name": "Sule Mansion2",
              "address": "Jalan Tirta Sule",
              "size": 2000,
              "tower": "A",
              "floor": "10A",
              "furnishing": "Semi Furnished",
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 50,000,000,000.00",
                "leaseTerm": "21 month",
                "id": 11,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "200%",
                    "includedWithinPrice": "No",
                    "detail": "200% Value Added Tax included within price",
                    "id": 15,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 11,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "2 King Bedroom",
                  "id": 14,
                  "type": "King",
                  "unit": 2,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "ERSN-001",
              "name": "Gnome Terminal",
              "address": "Jalan ERSN",
              "size": 2000,
              "tower": "10A",
              "floor": "20A",
              "furnishing": null,
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 1,000,000,000.00",
                "sellPrice": "IDR 2,000,000,000.00",
                "leaseTerm": "12 month",
                "id": 12,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "12%",
                    "includedWithinPrice": "No",
                    "detail": "12% Value Added Tax included within price",
                    "id": 16,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 12,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "12 Premium Bedroom",
                  "id": 15,
                  "type": "Premium",
                  "unit": 12,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "ERSN-002",
              "name": "Gnome Terminal 2",
              "address": "None",
              "size": 2000,
              "tower": "A",
              "floor": "10A",
              "furnishing": null,
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 20,000,000.00",
                "sellPrice": "IDR 30,000,000.00",
                "leaseTerm": "12 month",
                "id": 13,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "12%",
                    "includedWithinPrice": "No",
                    "detail": "12% Value Added Tax included within price",
                    "id": 17,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 13,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "12 King Bedroom",
                  "id": 16,
                  "type": "King",
                  "unit": 12,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "ERSN-003",
              "name": "Gnome Terminal 3",
              "address": "None",
              "size": 2000,
              "tower": "A",
              "floor": "10A",
              "furnishing": null,
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 12,000.00",
                "sellPrice": "IDR 1,200,000.00",
                "leaseTerm": "12 month",
                "id": 16,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "12%",
                    "includedWithinPrice": "No",
                    "detail": "12% Value Added Tax included within price",
                    "id": 18,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 14,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "12 Premium Bedroom",
                  "id": 17,
                  "type": "Premium",
                  "unit": 12,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "ERSN-009",
              "name": "Gnome Terminal 7",
              "address": "None",
              "size": 2000,
              "tower": "10",
              "floor": "10A",
              "furnishing": null,
              "remark": "None",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 1,000.00",
                "sellPrice": "IDR 2,000.00",
                "leaseTerm": "12 month",
                "id": 17,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "12%",
                    "includedWithinPrice": "No",
                    "detail": "12% Value Added Tax included within price",
                    "id": 19,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 15,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "12 Premium Bedroom",
                  "id": 18,
                  "type": "Premium",
                  "unit": 12,
                  "PropertyFacilityName": {
                    "id": 1,
                    "facilityName": "Bedroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            },
            {
              "available": "Yes",
              "kodePropar": "SCBD-001",
              "name": "SCBD Suite Apartment",
              "address": "Jalan Tepo KM. 10",
              "size": 400,
              "tower": "B",
              "floor": "77",
              "furnishing": null,
              "remark": "Ownernya kribo",
              "PropertyArea": {
                "id": 5,
                "regionName": "Bekasi"
              },
              "ApartmentFee": {
                "rentalPrice": "IDR 50,000,000.00",
                "sellPrice": "IDR 120,000,000,000.00",
                "leaseTerm": "6 month",
                "id": 8,
                "priceCurrency": "Rupiah",
                "PropertyPaymentTerm": null,
                "ApartmentTaxFees": [
                  {
                    "percentage": "5%",
                    "includedWithinPrice": "No",
                    "detail": "5% Value Added Tax included within price",
                    "id": 11,
                    "taxType": "Value Added Tax"
                  }
                ]
              },
              "PropertyPersonInCharge": {
                "id": 2,
                "fullname": "Andi Muhammad Rezki",
                "role": "Developer",
                "company": "Andi Empire",
                "phoneNumber": "082144569073"
              },
              "ApartmentAccesses": [
                {
                  "detail": "Direct Access to Indomaret",
                  "id": 7,
                  "type": "Direct",
                  "PropertyIconicPlace": {
                    "id": 2,
                    "placeName": "Indomaret"
                  }
                }
              ],
              "ApartmentFacilities": [
                {
                  "detail": "3 Suite Bathroom",
                  "id": 10,
                  "type": "Suite",
                  "unit": 3,
                  "PropertyFacilityName": {
                    "id": 12,
                    "facilityName": "Bathroom",
                    "iconPath": "",
                    "iconUrl": ""
                  }
                }
              ],
              "ApartmentPhotos": []
            }
          ]
        }
      },
      "meta": {
        "version": "1.0",
        "timestamp": "2/15/2023, 4:42:31 PM"
      }
    }
    ```

  - Error response:

    ```json
    {
      "code": 401,
      "status": "UNAUTHORIZED",
      "errors": {
        "access_token": "access token is missing"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
      }
    }
    ```

- ### Query Params List

  - #### Pagination

    - Size

      - Fungsi:
        - Untuk menentukan banyaknya data dalam 1 halaman
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        size: number;
        ```

    - Page
      - Fungsi:
        - Untuk menentukan nomor halaman
      - `Nama Query` `:` `Tipe Data`:
        ```ts
        page: number;
        ```

  - #### Apartment

    - Kode Propar

      - Fungsi:
        - Untuk mencari apartement berdasarkan `kode_propar` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        kode_propar: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan kode propar `AMP-001`
           ```txt
           BASE_URL/apartment/read?kode_propar=AMP-001
           ```
        2. Mengurutkan apartment berdasarkan `kode_propar` secara `ascending`
           ```txt
           BASE_URL/apartment/read?kode_propar=ASC
           ```
        3. Mengurutkan apartment berdasarkan `kode_propar` secara `descending`
           ```txt
           BASE_URL/apartment/read?kode_propar=DESC
           ```

    - Name

      - Fungsi:
        - Untuk mencari apartement berdasarkan `nama` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        name: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan nama `Ampera Mansion`
           ```txt
           BASE_URL/apartment/read?name=Ampera%20Mansion
           ```
        2. Mengurutkan apartment berdasarkan `name` secara `ascending`
           ```txt
           BASE_URL/apartment/read?name=ASC
           ```
        3. Mengurutkan apartment berdasarkan `name` secara `descending`
           ```txt
           BASE_URL/apartment/read?name=DESC
           ```

    - Address

      - Fungsi:
        - Untuk mencari apartement berdasarkan `alamat` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        address: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan alamat `Jalan Tepo`
           ```txt
           BASE_URL/apartment/read?address=Jalan%20Tepo
           ```
        2. Mengurutkan apartment berdasarkan `address` secara `ascending`
           ```txt
           BASE_URL/apartment/read?address=ASC
           ```
        3. Mengurutkan apartment berdasarkan `address` secara `descending`
           ```txt
           BASE_URL/apartment/read?address=DESC
           ```

    - Size

      - Fungsi:
        - Untuk mencari apartement berdasarkan `size` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        apartment_size: string;
        size_from: number;
        size_to: number;
        ```

      - Contoh request:
        1. Mencari apartment dengan `minimal size` berupa 200
           ```txt
           BASE_URL/apartment/read?size_from=200
           ```
        2. Mencari apartment dengan `size antara` 200 `hingga` 500
           ```txt
           BASE_URL/apartment/read?size_from=200&&size_to=500
           ```
        3. Mengurutkan apartment berdasarkan `size` secara `ascending`
           ```txt
           BASE_URL/apartment/read?apartment_size=ASC
           ```
        4. Mengurutkan apartment berdasarkan `size` secara `descending`
           ```txt
           BASE_URL/apartment/read?apartment_size=DESC
           ```

    - Tower

      - Fungsi:
        - Untuk mencari apartement berdasarkan `tower` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        tower: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan tower `3A`
           ```txt
           BASE_URL/apartment/read?tower=3A
           ```
        2. Mengurutkan apartment berdasarkan `tower` secara `ascending`
           ```txt
           BASE_URL/apartment/read?tower=ASC
           ```
        3. Mengurutkan apartment berdasarkan `tower` secara `descending`
           ```txt
           BASE_URL/apartment/read?tower=DESC
           ```

    - Floor

      - Fungsi:
        - Untuk mencari apartement berdasarkan `floor` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        floor: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan floor `10`
           ```txt
           BASE_URL/apartment/read?floor=10
           ```
        2. Mengurutkan apartment berdasarkan `floor` secara `ascending`
           ```txt
           BASE_URL/apartment/read?floor=ASC
           ```
        3. Mengurutkan apartment berdasarkan `floor` secara `descending`
           ```txt
           BASE_URL/apartment/read?floor=DESC
           ```

    - Furnishing

      - Fungsi:
        - Untuk mencari apartement berdasarkan `furnishing` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        furnishing: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan furnishing `Fully Furnished`
           ```txt
           BASE_URL/apartment/read?furnishing=Fully%20Furnished
           ```
        2. Mengurutkan apartment berdasarkan `furnishing` secara `ascending`
           ```txt
           BASE_URL/apartment/read?furnishing=ASC
           ```
        3. Mengurutkan apartment berdasarkan `furnishing` secara `descending`
           ```txt
           BASE_URL/apartment/read?furnishing=DESC
           ```

    - Available

      - Fungsi:
        - Untuk mencari apartement berdasarkan `available` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        available: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan available `Yes`
           ```txt
           BASE_URL/apartment/read?available=Yes
           ```
        2. Mengurutkan apartment berdasarkan `available` secara `ascending`
           ```txt
           BASE_URL/apartment/read?available=ASC
           ```
        3. Mengurutkan apartment berdasarkan `available` secara `descending`
           ```txt
           BASE_URL/apartment/read?available=DESC
           ```

    - Remark

      - Fungsi:
        - Untuk mencari apartement berdasarkan `remark` apartment tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        remark: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan remark `Ownernya kribo`
           ```txt
           BASE_URL/apartment/read?remark=Ownernya%20kribo
           ```
        2. Mengurutkan apartment berdasarkan `remark` secara `ascending`
           ```txt
           BASE_URL/apartment/read?remark=ASC
           ```
        3. Mengurutkan apartment berdasarkan `remark` secara `descending`
           ```txt
           BASE_URL/apartment/read?remark=DESC
           ```

  - #### Apartment Facility

    - Facility Name

      - Fungsi:
        - Untuk mencari apartement berdasarkan `property_facility_name` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        facility_name: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan facility_name `Bedroom`
           ```txt
           BASE_URL/apartment/read?facility_name=Bedroom
           ```

    - Facility Type

      - Fungsi:
        - Untuk mencari apartement berdasarkan `apartment_facility_type` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        facility_name: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan facility_type `Suite`
           ```txt
           BASE_URL/apartment/read?facility_type=Suite
           ```

    - Facility Unit

      - Fungsi:
        - Untuk mencari apartement berdasarkan `apartment_facility_unit` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        facility_unit: number;
        ```

      - Contoh request:
        1. Mencari apartment dengan facility_unit `2`
           ```txt
           BASE_URL/apartment/read?facility_unit=2
           ```

  - #### Apartment Access

    - Access Place

      - Fungsi:
        - Untuk mencari apartement berdasarkan `property_iconic_place_name` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        access_place: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan access_place `Indomaret`
           ```txt
           BASE_URL/apartment/read?access_place=Indomaret
           ```

  - #### Property Area

    - Area

      - Fungsi:
        - Untuk mencari apartement berdasarkan `property_area` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        area: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan area `Bekasi`
           ```txt
           BASE_URL/apartment/read?area=Bekasi
           ```

  - #### Apartment Fee

    - Rental Price

      - Fungsi:
        - Untuk mencari apartement berdasarkan `rental_price` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        rental_price_from: number;
        rental_price_to: number;
        ```

      - Contoh request:
        1. Mencari apartment dengan `minimal rental price` berupa 35000000
           ```txt
           BASE_URL/apartment/read?rental_price_from=35000000
           ```
        2. Mencari apartment dengan `rental price antara` 35000000 `hingga` 12000000000
           ```txt
           BASE_URL/apartment/read?rental_price_from=35000000&&rental_price_to=12000000000
           ```

    - Sell Price

      - Fungsi:
        - Untuk mencari apartement berdasarkan `sell_price` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        sell_price_from: number;
        sell_price_to: number;
        ```

      - Contoh request:
        1. Mencari apartment dengan `minimal sell price` berupa 35000000
           ```txt
           BASE_URL/apartment/read?sell_price_from=35000000
           ```
        2. Mencari apartment dengan `sell price antara` 35000000 `hingga` 12000000000
           ```txt
           BASE_URL/apartment/read?sell_price_from=35000000&&sell_price_to=12000000000
           ```

    - Price Currency

      - Fungsi:
        - Untuk mencari apartement berdasarkan `price_currency` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        price_currency: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan price_currency `Rupiah`
           ```txt
           BASE_URL/apartment/read?price_currency=Rupiah
           ```

    - Payment Term

      - Fungsi:
        - Untuk mencari apartement berdasarkan `payment_term` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        payment_term: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan payment_term `Full in Advance`
           ```txt
           BASE_URL/apartment/read?payment_term=Full in Advance
           ```

  - #### Apartment Tax Fee

    - Rental Price

      - Fungsi:
        - Untuk mencari apartement berdasarkan `tax_percentage` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        tax_percentage_from: number;
        tax_percentage_to: number;
        ```

      - Contoh request:
        1. Mencari apartment dengan `minimal tax_percentage` berupa 3
           ```txt
           BASE_URL/apartment/read?tax_percentage_from=3
           ```
        2. Mencari apartment dengan `tax_percentage antara` 3 `hingga` 15
           ```txt
           BASE_URL/apartment/read?tax_percentage_from=3&&tax_percentage_to=15
           ```

    - Tax Type

      - Fungsi:
        - Untuk mencari apartement berdasarkan `tax_type` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        tax_type: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan tax_type `Withholding Tax`
           ```txt
           BASE_URL/apartment/read?tax_type=Withholding Tax
           ```

    - Tax is Included Within Price

      - Fungsi:
        - Untuk mencari apartement berdasarkan `Tax is Included Within Price` tertentu
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        tax_is_included: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan tax_is_included `Yes`
           ```txt
           BASE_URL/apartment/read?tax_is_included=Yes
           ```

  - #### Property Person in Charge

    - Fullname

      - Fungsi:
        - Untuk mencari apartement berdasarkan `fullname` tertentu dari `property_person_in_charges`
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        pic_fullname: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan pic_fullname `Andi Rezki Muhammad`
           ```txt
           BASE_URL/apartment/read?pic_fullname=Andi%20Rezki%20Muhammad
           ```

    - Role

      - Fungsi:
        - Untuk mencari apartement berdasarkan `role` tertentu dari `property_person_in_charges`
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        pic_role: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan pic_role `Owner`
           ```txt
           BASE_URL/apartment/read?pic_role=Owner
           ```

    - Company

      - Fungsi:
        - Untuk mencari apartement berdasarkan `company` tertentu dari `property_person_in_charges`
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        pic_company: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan pic_company `Andi Empire`
           ```txt
           BASE_URL/apartment/read?pic_company=Andi Empire
           ```

    - Phone Number

      - Fungsi:
        - Untuk mencari apartement berdasarkan `phone_number` tertentu dari `property_person_in_charges`
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        pic_phone_number: string;
        ```

      - Contoh request:
        1. Mencari apartment dengan pic_phone_number `081827110314`
           ```txt
           BASE_URL/apartment/read?pic_phone_number=081827110314
           ```

## Update or Create an `Apartment`

- Description:

  - Berfungsi untuk mengubah data `apartment` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `kode_propar` dalam bentuk `string`.
    Contoh: `BASE_URL/apartment/update/AMP-001`
  - Perlu body request berupa data `Apartment` baru yang akan mengubah data
    `Apartment` yang sudah terdaftar

- `NOTE`:
  - Jika data yang ingin diubah adalah data `null`, maka method ini secara otomatis akan membuat data baru sesuai dengan request
- ### URL
  - /apartment/update/:kode_propar
- ### Method
  - PUT
- ### Request Data

  - #### Content-Type

    ```txt
    multipart/form-data
    ```

  - #### Optional input attribute `:` `Data type`

    - kodePropar
      ```ts
      kodePropar: {
        type: string,
        pattern: /^[A-Z]{1,7}-[0-9]{3}$/
      };
      ```
    - name
      ```ts
      name: {
        type: string,
        pattern: /[^a-zA-Z0-9 ]+/,
      };
      ```
    - picId
      ```ts
      picId: number;
      ```
    - propertyArea
      ```ts
      propertyArea: string;
      ```
    - images
      <br />Untuk menambah foto baru
      ```ts
      images: object[];
      ```
    - address
      ```ts
      address: {
        type: string,
        pattern: /[^a-zA-Z0-9., ]+/,
      };
      ```
    - size
      ```ts
      size: number;
      ```
    - tower
      ```ts
      tower: {
        type: string,
        pattern: /[^a-zA-Z0-9]+/,
      };
      ```
    - floor
      ```ts
      floor: {
        type: string,
        pattern: /[^a-zA-Z0-9]+/,
      };
      ```
    - furnishing
      ```ts
      furnishing: string[("Fully Furnished", "Semi Furnished", "Unfurnished")];
      ```
    - available
      ```ts
      available: boolean;
      ```
    - remark
      ```ts
      remark: string;
      ```
    - fees
      ```ts
      fees: object;
      ```
      - Jika `fees` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          rentalPrice: number,
          sellPrice: number,
          priceCurrency: {
            type: string[("Rupiah", "US Dollar")],
            required: true
          },
          propertyPaymentTermsName: string,
          leaseTerms: number,
        }
        ```
    - taxFees

      ```ts
      taxFees: object[];
      ```

      - Jika `taxFees` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          taxType: string[("Value Added Tax", "Withholding Tax")],
          percentage: number,
          includedWithinPrice: boolean,
        }
        ```

    - facilities

      ```ts
      facilities: object[];
      ```

      - Jika `facilities` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          propertyFacilityName: string,
          type: {
            type: string,
            pattern: /[^a-zA-Z0-9 ]+/,
          },
          unit: number,
        }
        ```

    - accesses

      ```ts
      accesses: object[];
      ```

      - Jika `accesses` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          propertyIconicPlaceName: string,
          type: {
            type: string,
            pattern: /[^a-zA-Z0-9 ]+/,
          },
        }
        ```

    - photoIds
      <br />Untuk menghapus foto berdasarkan `id`
      ```ts
      photoIds: object[];
      ```
      - Jika `photoIds` tidak kosong, maka berikut adalah field yang perlu diisi:
        ```ts
        {
          id: number,
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
        "size": "size must be integer"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
      }
    }
    ```

## Delete specific `Apartment` by kode_propar

- Description:
  - Berfungsi untuk menghapus satu data `Apartment` sesuai dengan `kode_propar`
    dari database
  - Membutuhkan `route parameter` berupa `kode_propar` dalam bentuk `string`.
    Contoh: `BASE_URL/apartment/delete/AMP-001`
- ### URL
  - /apartment/delete/:kode_propar
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
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "kode_propar": "kode_propar not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
      }
    }
    ```

- ### Query Params List

  - #### Hard Delete

    - force

      - Fungsi:
        - Untuk melakukan hard delete terhadap apartment berdasarkan `kode_propar`
      - `Nama Query` `:` `Tipe Data`:

        ```ts
        force: number;
        ```

## Restore specific `Apartment` by kode_propar

- Description:
  - Berfungsi untuk mengembalikan satu data `Apartment` yang sudah terhapus
    `(soft-delete)` sesuai dengan `kode_propar` dari database
  - Membutuhkan `route parameter` berupa `kode_propar` dalam bentuk `string`.
    Contoh: `BASE_URL/apartment/restore/AMP-001`
- ### URL
  - /apartment/restore/:kode_propar
- ### Method
  - PUT
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
        "type": "apartments",
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
      "code": 404,
      "status": "NOT_FOUND",
      "errors": {
        "kode_propar": "kode_propar not found"
      },
      "meta": {
        "version": "1.0",
        "timestamp": "1/22/2023, 10:53:28 PM"
      }
    }
    ```
