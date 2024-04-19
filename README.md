# CRUD API

This is a basic CRUD (Create, Read, Update, Delete) API for managing **Todos**.

## Prerequisites

Before running the API, make sure you have the following installed:

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com) (Node Package Manager)
- [MongoDB](https://www.mongodb.com) 

If you don't have MongoDB installed, you can use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [mLab](https://mlab.com).

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hardik-143/the-crud-api.git
    ```

2. Configure the database connection:
    &nbsp;
    Open the `config.js` file and update the database connection URL and port.

    ```javascript
    const DATABASEURL = 'mongodb://localhost:27017/todos'
    const PORT = 9000;

    export { DATABASEURL, PORT };
    ```
    &nbsp;

    Replace `mongodb://localhost:27017/todos` with your MongoDB connection URL. 

    &nbsp;

    Using MongoDB Atlas:

    ```javascript
    const DATABASEURL = 'mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority'
    const PORT = 9000;

    export { DATABASEURL, PORT };
    ```

    &nbsp;

    Using mLab:

    ```javascript
    const DATABASEURL = 'mongodb://<username>:<password>@<host>:<port>/<database>'
    const PORT = 9000;

    export { DATABASEURL, PORT };
    ```

    &nbsp;

    Using Environment Variables is recommended for storing sensitive information like database credentials.
\
&nbsp;

3. Install the dependencies:
&nbsp;

    ```bash
    npm install
    ```

    Above command will install all the dependencies required for the project.

## Usage

To start the API in your local environment, run the following command:

```bash
npm start
```

The API will start on the port specified in the `config.js` file. You can access the API at [http://localhost:9000](http://localhost:9000).

Introduction to the API:

# The CRUD API
a simple CRUD API for managing your todos.

## Features
- Create a new todo
- Get all todos
- Get a specific todo by ID
- Update an existing todo
- Delete an existing todo
- Password protected
- Secure API

## Endpoints

| Method | URL       | Description          |
|--------|----------------|----------------------|
| `GET`    | `/todos`       | Get all todos        |
| `GET`    | `/todos/:id`   | Get a specific todo by ID |
| `POST`   | `/todos`       | Create a new todo    |
| `PUT`    | `/todos/:id`   | Update an existing todo |
| `DELETE` | `/todos/:id`   | Delete an existing todo |

## Request Parameters

| Parameter  | Type   | Description               |
|------------|--------|---------------------------|
| `user`     | string | The name of the user      |
| `max`      | number | The maximum number of todos to return |
| `page`     | number | The page number of the results |
| `limit`    | number | The number of todos to return per page |

**Note**: 
- The `max`, `page`, and `limit` parameters are optional.
- Prefer using the `page` and `limit` parameters for pagination.
- The `max` parameter will override the `page` and `limit` parameters.

## API Documentation

Request examples for creating, updating, and deleting todos:

### POST 
```
{
    "todo": "Todo Title",
    "created_by": "YOUR NAME",
    "password" : "YOUR PASSWORD",
}
```


**Note**: Please remember your password. It is crucial for creating new todos and modify existing ones.

### PUT
```
{
    "todo": "Updated Todo Title",
    "password" : "YOUR PASSWORD"
}
```

### DELETE
```
{
    "password" : "YOUR PASSWORD",
}
```

Using the API via Postman or any other API client:

1. Create a new todo:
    - Send a `POST` request to `http://localhost:9000/todos` with the request body as shown above.
2. Get all todos:
    - Send a `GET` request to `http://localhost:9000/todos`.
3. Get a specific todo by ID:
    - Send a `GET` request to `http://localhost:9000/todos/:id` where `:id` is the ID of the todo.
4. Update an existing todo:
    - Send a `PUT` request to `http://localhost:9000/todos/:id` with the request body as shown above.
5. Delete an existing todo:
    - Send a `DELETE` request to `http://localhost:9000/todos/:id` where `:id` is the ID of the todo.


## Using Curl

Here are some examples of using the API with `curl`:

1. Create a new todo:
    ```bash
    curl -X POST http://localhost:9000/todos -H "Content-Type: application/json" -d '{"todo": "Todo Title", "created_by": "YOUR NAME", "password": "YOUR PASSWORD"}'
    ```

2. Get all todos:
    ```bash
    curl http://localhost:9000/todos
    ```

3. Get a specific todo by ID:
    ```bash
    curl http://localhost:9000/todos/:id
    ```

4. Update an existing todo:
    ```bash
    curl -X PUT http://localhost:9000/todos/:id -H "Content-Type: application/json" -d '{"todo": "Updated Todo Title", "password": "YOUR PASSWORD"}'
    ```

5. Delete an existing todo:
    ```bash
    curl -X DELETE http://localhost:9000/todos/:id -H "Content-Type: application/json" -d '{"password
    ": "YOUR PASSWORD"}'
    ```
    
    &nbsp;
    Replace `:id` with the ID of the todo.

## Live

The API is live at [https://the-crud-api.vercel.app](https://the-crud-api.vercel.app)

## When to use the API

- When you need a simple CRUD API for managing todos.
- When you need to create, read, update, and delete todos.
- When you need a secure API with password protection.
- When you need a rate-limited API to prevent abuse.
- When you need a CORS-protected API.

## Rate Limiting

The API has rate limiting enabled to prevent abuse. The rate limit is set to 100 requests per hour. If you exceed the rate limit, you will receive a `429 Too Many Requests` response.

## Rate Limiting Example

Here is an example of the rate limiting response:

```bash
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 3600
Content-Type: application/json
Content-Length: 35
Date: Thu, 01 Jul 2021 12:00:00 GMT

{
    "message": "Rate limit exceeded"
}
```


## Response Headers

The API returns the following headers in the response:

| Header                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| `X-RateLimit-Limit`     | The maximum number of requests allowed in a given time frame. |
| `X-RateLimit-Remaining` | The number of requests remaining in the current time frame. |
| `X-RateLimit-Reset`     | The time when the rate limit will reset.                |
| `Content-Type`          | The type of content in the response body.               |
| `Content-Length`        | The length of the response body in bytes.               |
| `Date`                  | The date and time when the response was sent.           |


## Security
Here are some security features implemented in the API:
- Password protection for creating, updating, and deleting todos.
- Secure API using HTTPS.
- CORS protection.
- Rate limiting to prevent abuse.

  
## Author
👤 **Hardik desai**



## Social

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thehardik.in//)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thehardik143/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/__thehardik/)
