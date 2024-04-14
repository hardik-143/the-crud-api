# CRUD API

This is a basic CRUD (Create, Read, Update, Delete) API for managing **Todos**.

## Prerequisites

Before running the API, make sure you have the following installed:

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com) (Node Package Manager)
- [MongoDB](https://www.mongodb.com) 

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hardik-143/the-crud-api.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure the database connection:

    Open the `config.js` file and update the database connection URL.

## Usage

To start the API, run the following command:

```bash
npm install
```

## Routes 

### GET /todos
Get all todos.

### GET /todos/:id
Get a specific todo by ID.

### POST /todos
Create a new todo.

To create a new todo, send a POST request to the `/todos` endpoint with the following request body:

```
{
    "todo": "Todo Title",
    "created_by": "YOUR NAME",
    "password" : "YOUR PASSWORD",
}
```

**Note**: Please remember your password. It is crucial for creating new todos and modify existing ones.


### PUT /todos/:id
Update an existing todo.

To update an existing todo, send a PUT request to the `/todos/:id` endpoint with the following request body:

```
{
    "todo": "Updated Todo Title",
    "password" : "YOUR PASSWORD"
}
```

### DELETE /todos/:id
Delete an existing todo.

To delete an existing todo, send a DELETE request to the `/todos/:id` endpoint with the following request body:

```
{
    "password" : "YOUR PASSWORD",
}
```

## Social

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thehardik.in//)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thehardik143/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/__thehardik/)
