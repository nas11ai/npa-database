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
  - DELETE
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
- ### Request Body Example
  ```json
  {
    "facility_name": "Bathroom"
  }
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
- ### Request Body Example
  ```json
  {
    "new_facility_name": "Study Room"
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
- ### Request Body Example
  ```json
  {}
  ```
- ### Response

  - Expected output:
    ```json
    {}
    ```
  - Error response:

    ```json
    {}
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
    {}
    ```
  - Error response:

    ```json
    {}
    ```

## Update an `Apartment`

- Description:
  - Berfungsi untuk mengubah data `apartment` yang sudah terdaftar di tabel
  - Membutuhkan `route parameter` berupa `kode_propar` dalam bentuk `string`.
    Contoh: `BASE_URL/property/iconic_places/update/AMP-001`
  - Perlu body request berupa data `Apartment` baru yang akan mengubah data
    `Apartment` yang sudah terdaftar
- ### URL
  - /apartment/update/:kode_propar
- ### Method
  - PUT
- ### Request Body Example
  ```json
  {}
  ```
- ### Response

  - Expected output:

    ```txt

    ```

  - Error response:

    ```json
    {}
    ```

## Delete specific `Apartment` by kode_propar

- Description:
  - Berfungsi untuk menghapus satu data `Apartment` sesuai dengan `kode_propar`
    dari database
  - Membutuhkan `route parameter` berupa `kode_propar` dalam bentuk `string`.
    Contoh: `BASE_URL/property/iconic_places/delete/AMP-001`
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
    {}
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
  - DELETE
- ### Request Body Example
  ```txt
  Empty Body Request
  ```
- ### Response

  - Expected output:

    ```json
    {}
    ```

  - Error response:

    ```json
    {}
    ```
