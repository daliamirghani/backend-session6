# Session 6: Express CRUD API

### Objective
Learn how to make an API with functional endpoints and test them using Postman/ThunderClient.
## Agenda
- [Objective](#objective)
- [Recap](#recap)
- [Route Handlers](#route-handlers)
- [Ways Clients Send Data to the Backend](#ways-clients-send-data-to-the-backend)
  - [1. Query](#1-query)
  - [2. Parameter](#2-parameter)
  - [3. Request Body](#3-request-body)
- [What is Middleware?](#what-is-middleware)
- [How to Use Postman?](#how-to-use-postman)
- [Hands on](#hands-on)

---

### Recap

#### CRUD Operations Mapped to HTTP Methods
- Create → **POST**
- Read → **GET**
- Update → **PUT**
- Delete → **DELETE**

#### Steps to Initialize a Server
```bash
npm init -y
npm i express
npm i -g nodemon #nodemon allows automatic server restart at any change
```
---
Run server by writing `nodemon serverName.js` on the terminal
#### What’s an API?
**Application Programming Interface** — manages how incoming requests and responses work.

---

### Route Handlers
A route handler is the functions that runs when a route is accessed, it consists of:
- HTTP method
- Endpoint
- Function
- A response (at the end of the function)

---

### Ways Clients Send Data to the Backend
Note: All three ways are by default sent as string to the backend.
#### 1. Query
- Optional argument in the URL
- Written as key-value pairs after the `?` symbol (must be last thing in the URL)
- We can chain multiple queries in one URL with `&`
- Commonly used for filtering, sorting, etc.
- Key name in the URL must match the one in code  
**Example:** `/users?name=Ali&age=20`
![Query example](./images/query.png)

#### 2. Parameter
- Mandatory argument, written in the endpoint after a `:` symbol, can be in the beginning, middle or end of route.
- Used for necessary and unique identifiers such as IDs, usernames, etc.

**Example :** `/users/:group/:id`
![Parameter example](./images/query.png)

Both query and parameter must match the argument name in the code.
#### 3. Request Body
- Often used with **POST** and **PUT**
- Used for sending longer data in the form of a JSON object
- Requires middleware to convert from string to JSON

---

### What is Middleware?
Middleware functions in Express.js are functions that run during the request-response cycle.

**Use examples:**
- Authentication & Authorization
- Error Handling
- Parsing Content

**Notes:**
- `next` parameter is required in middleware functions, otherwise the request will be stuck.
- To apply middleware globally:  

```js
  app.use(middleware)
```
- Must be declared above all other routes
- `app.use(express.json())` parses request body from string to JSON

---




## Hands on
``` js
const users = [
  {
    id: 1,
    name: "Dalia",
    hobbies: [
      { name: "reading", skill: "advanced" },
      { name: "coding", skill: "intermediate" }
    ],
  },
  {
    id: 2,
    name: "Lina",
    hobbies: [
      { name: "gaming", skill: "beginner" },
      { name: "drawing", skill: "advanced" }
    ],
  }
];
```
1) Get all users & add an option to filter based on name
2) Add a new user to our array
3) Update a user's skill level on any hobby by ID
4) **Bonus:** Add a hobby to a user given their ID

### How to get key and value names in an object
``` js
const fruit = {
  name: "apple",
  color: "red"
};

// Print keys
console.log(Object.keys(fruit)); // Output: ["name", "color"]

// Print values
console.log(Object.values(fruit)); // Output: ["apple", "red"]
```

---

### How to Use Postman?
1. Choose HTTP Method 
2. Write URL and press **SEND**
3. If using a request body:
   - Go to **Body → Raw**
   - Select **JSON** and write your JSON data

---

## Task
All code written during the session will be in `session6.js` for reference.

  For the task, check this file -> [Task](./taskFiles/task.md) 


## References

1. [HTTP Methods in Express NodeJS](https://www.geeksforgeeks.org/express-js-http-methods/)
2. [Express NodeJS Routing](https://expressjs.com/en/guide/routing.html)


### Optional - Extra

1. [CRUD Operations - With DataBase (MongoDB)](https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/)