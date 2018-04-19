## Hostname
**Endpoint:** https://food-recycling.herokuapp.com
## API
### Handling
* [Success request](#success)
* [Error request](#error)
### Official
* [Authen](#auth)
  * [POST/auth/signin](#signin)
* [Users](#users)
  * [POST /api/users](#post-users)
  * [GET /api/users](#get-users)
  * [GET /api/users/me](#get-users-me)
  * [GET /api/users/:id](#get-users-id)
  * [PUT /api/users/me](#put-users-me)
  * [DELETE /api/users/logout](#logout-users-me)
* [Posts](#posts)
  * [Get /api/posts](#get-posts)
  * [POST /api/posts](#upload-posts)
  * [GET /api/posts/category](#get-posts-filter)
  * [GET /api/posts/me](#get-posts-me)
  * [GET /api/posts/:id](#get-posts-id)
  * [PUT /api/posts/:id](#put-posts-id)
  * [DELETE /api/posts/:id](#delete-posts-id)
* [Photos](#photos)
  * [POST /api/photos/upload](#post-photos)
  
## <a name="error"></a> Errors handling
Http status code should be checked for at least following error conditions:
* 400 Bad Request 
* 401 Unauthorized
* 403 Forbidden 
* 404 Not Found 
* 405 Method Not Allowed
* 406 Not Acceptable
* 415 Unsupported Media Type
* 500 Internal Server Error
* 503 Service Unavailable

**Error payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| code | int | HttpStatus |
| description | string | Error Description |

**Sample error:**
```json
{
  "status": 400,
  "code": 14,
  "description": "This username has already been used"
}
```

## <a name="success"></a> Success response

**Success payload:**

| key |	type | description |
| --- | --- | --- |
| status | string | HttpStatus |
| data | data | Response payload data |

**Sample success payload:**
```json
{
  "status": 200,
  "data": {
   HERE IS THE RESPONSE PAYLOAD
  }
}
```

## <a name="auth"></a>Authentication
### <a name="signin"></a>POST/auth/login
Sign in user

Request body:

| key |	type | description |
| --- | --- | --- |
| email | string | |
| password | string | |

Response payload

| key |	type | description |
| --- | --- | --- |
| _id | string | User Id |
| email | string | Email |
| tokens | string | Server Token |

Sample request:

```json
{
  "email": "vu34@fi.com",
  "password": "123456",
}
```

Sample response:

```json
{
  "_id": "5ad7a1a2e1c12d2874099a70",
    "email": "vu34@fi.com",
    "tokens": 
        {
            "_id": "5ad7a1a2e1c12d2874099a71",
            "access": "auth",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWQ3YTFhMmUxYzEyZDI4NzQwOTlhNzAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI0MDgxMDU4fQ.gAwPdMnRu2UxTuabBuJWCvCBWkoQ-9a3JFd3HeIIEDg"
        }
    
}
```

## <a name="users"></a> Users
### <a name="post-users"></a> POST /api/users
Register User
Request body:

| key |	type | description |
| --- | --- | --- |
| email | string | Email |
| password | string | |

Response payload

| key |	type | description |
| --- | --- | --- |
| _id | string | User Id |
| email | string | Email |
| tokens | string | Server Token |

Sample request:

```json
{
  "email": "vu34@fi.com",
  "password": "123456",
}
```

Sample response:

```json
{
  "_id": "5ad7a1a2e1c12d2874099a70",
    "email": "vu34@fi.com",
    "tokens": 
        {
            "_id": "5ad7a1a2e1c12d2874099a71",
            "access": "auth",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWQ3YTFhMmUxYzEyZDI4NzQwOTlhNzAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI0MDgxMDU4fQ.gAwPdMnRu2UxTuabBuJWCvCBWkoQ-9a3JFd3HeIIEDg"
        }
    
}
```

### <a name="get-users"></a> GET /api/users/
Get a list of user

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| _id | string | User Id |
| email | string | Email |

Sample response data:
```json
[
    {
      "_id": "5ac77ca090b6512c8000f4ff"
      "email": "test1@gmail.com",
    },
    {
      "_id": "5ac77ca090b6512c8000f500"
      "email": "test2@gmail.com",
    }
]
```

### <a name="get-users-me"></a> GET /api/users/me
Get me

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| _id | string | User Id |
| email | string | Email |

Sample header:
```json
{
  "authorization":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
{
      "_id": "5ac77ca090b6512c8000f500"
      "email": "test2@gmail.com",
}
```

### <a name="get-users-id"></a>  GET /api/users/:id
Get user by id

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload

| key |	type | description |
| --- | --- | --- |
| _id | string | User Id |
| email | string | Email |

Sample response data:

```json
{
      "_id": "5ac77ca090b6512c8000f500"
      "email": "test2@gmail.com",
}
```

### <a name="put-users-me"></a> PUT /api/users/me
Edit me
Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| password | string | otional |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| _id | string |  |
| email | string | |

Sample request:

```json
{
  "password": "123456",
}
```
Sample response data:

```json
{
  "_id": "5ac7dfbab9de6a44883184b9",
  "email": "test@gmail.com"
}
```

## <a name="posts"></a> Posts
### <a name="get-posts"></a> Get /api/posts
Get all posts
Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload data

| key |	type | description |
| --- | --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]
```

### <a name="upload-posts"></a> POST /api/posts
Upload a new post 

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| description | string |  |
| category | string | Valid values: **vegetables**, **meat**, **drink**|
| imgPath | string | |

Response payload data

| key |	type | description |
| --- | --- | --- |
| key |	type | description |
| --- | --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]

```

### <a name="get-posts-filter"></a> GET /api/posts/category
Get posts filtered by category

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Request params:

| key |	type | description |
| --- | --- | --- |
| category | string | Valid values: **vegetables**, **meat**, **drink**|

Response payload data

| key |	type | description |
| --- | --- | --- |
| key |	type | description |
| --- | --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]

```

### <a name="get-posts-me"></a> GET /api/posts/me
Get all my posts

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload:
| --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample header:
```json
{
  "x-auth":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]
```

### <a name="get-posts-id"></a> GET /api/posts/:id
Get one post based on id
Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload:
| --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample header:
```json
{
  "x-auth":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]
```

### <a name="put-posts-id"></a> PUT /api/posts/:id
Edit post based on id

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| description | string | optional |
| category | string | Valid values: **vegetables**, **meat**, **drink**| optional |
| imgPath | string | optional |

Response payload:
| --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample header:
```json
{
  "x-auth":"HERE IS THE TOKEN"
}
```



Sample request:

```json
{
  "description": "nice",
  "category": "meat",
  "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
}
```

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]
```

### <a name="delete-posts-id"></a> DELETE /api/posts/:id
Delete post based on id

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Response payload:
| --- | --- |
| _id | string |  |
| description | string |  |
| imgPath | string |  |
| category | string |  |
| uploader | user |  |

**uploader** in detail

| key |	type | description |
| --- | --- | --- |
| _id | string | |
| email| string |  |

Sample header:
```json
{
  "x-auth":"HERE IS THE TOKEN"
}
```

Sample response data:

```json
[
    {
        "_id": "5ad7a91fc5fe9432d0fa6fbc",
        "description": "fd",
        "imgPath": "https://food-recycling.herokuapp.com/photos/photo-1524080526725.jpg",
        "category": "vegetables",
        "uploader": {
            "_id": "5ad712a46077f92dfcbe2953",
            "email": "bitchy12@gmail.com"
        },
        "__v": 0
    }
]
```

## <a name="photos"></a> Photos
### <a name="post-photos"></a> POST /api/photos/upload
Post a photo to server

Header payload:

| key |	type | description |
| --- | --- | --- |
| x-auth | string | Server Token  |

Request body:

| key |	type | description |
| --- | --- | --- |
| photo | file | jpeg, jpg, png |

Response payload data:

| key |	type | description |
| --- | --- | --- |
| filename | string | |

Sample header:
```json
{
  "x-auth":"HERE IS THE TOKEN"
}
```

Sample response payload data:
```json
{
  "filename": "1523041333190-photo.PNG"
}
```
**Note:** photoPath: {endpoint}/photos/{filename}

  
