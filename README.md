# blogAPI
Deployed on Heroku:
https://jaimeblogapi.herokuapp.com/

# Project Description
API that uses Json Web Token (JWT) authorization so user can authenticate across apps or micro-services. JWT stores authorization with the Client, NOT the Server. 

The user must create a profile with password, which is then hashed using the bcrypt dependency to hash, salt and store the encrypted password.

User:
There are distinct routes to create, read, update and delete the user. There is a separate router to login the user. There are two user routes for reading. /users to list all users and /user/:id to find a specific user by the id.

Blogs:
There are distinct routes to create, read, update and delete users' blogs. 


## Tech Stack and Apps Used:
1. NodeJS
2. Express
3. MongoDB
4. Mongoose
5. Postman
6. Github
7. Heroku
8. VSC as my editor

## NPMs Used:
1. express
2. express-validator
3. bcrypt
4. dotenv 
5. ejs
6. helmet
7. jsonwebtoken
8. mongoose
9. morgan

## Env
MONGODB_URI
SECRET_KEY

## Endpoints,Parameters,Schema
### CRUD:
3 routers and 2 schemas on server side: 

## Routers:
0. server.js 
1. routers/authRouter.js for login
2. routers/userRouter.js for CRUD
3. routers/blogRouter.js for CRUD

## Schema:
### Files:
#### models/userSchema.js
username:
        type: String,
        required: true

email: 
        type: String,
        required: true,
        unique: true

birthday: 
        day: 
        type: Number
    
        month:
        type: Number
            
        year:
        type: Number
        
age: 
        type: Number

password:
        type: String,
        required: true
        
created_at:
        type: Date,
        default: Date.now()

#### models/blogSchema.js
 created_by:
        type: String,
        required: true
title: 
        type: String,
        required: true
    
content: 
        type: String,
        required: true
    
private: 
        type: Boolean,
        required: true
    
created_at: 
        type: Date,
        date: Date.now()


## General Loading Instructions
1. Run 'nodemon server.js' in terminal to start app
2. Run postman to Create, Read, Update and Delete all Users and individual User blogs by entering User's JWT in Postman's headers. Key: x-auth-token Value: the JWT token provided when user is created.

### USER routes SERVER
- Create User: router.post('/users/new') userSchema is used, password is hashed, JWT is created
- Read all Users: router.post('/users')
- Read User by ID: router.post('/users/:id')
- Update User: router.post('/users/:id')
- Delete User: router.post('/users/:id')
- Login User: go to authRouter.js router.post('/') 
### USER routes POSTMAN
- Create User: /users/new 
NOTE: You MUST copy JWT and in the following requests, go to 'header' tab and use 'x-auth-token" as the 'key' and the JWT in 'value'. This must be done to ALL CRUD requests for the user, in postman header.
- Login User: /auth 
- Read all Users: /users
- Read User by ID: /users/user's id
- Update User: /users/user's id
- Delete User: /user/user's id
### BLOG routes SERVER
- Create Blog: router.post('/blogs/new')
- Read all Blog: router.post('/blogs')
- Read Blog by ID: router.post('/blogs/:id')
- Read Public Blogs: router.post('/blogs/public')
- Update Blog: router.post('/blogs/:id')
- Delete Blog: router.post('/blogs/:id')
### BLOG routes POSTMAN
- Create Blog: /blogs/new 
NOTE: You MUST copy JWT and in the following requests, go to 'header' tab and use 'x-auth-token" as the 'key' and the JWT in 'value'. This must be done to ALL CRUD requests for the blogs, in postman header.
- Create Blog: /blogs/new
- Read all Blogs: /blogs 
- Read Blogs by ID: /blogs/blog id
- Filter Public blogs: /blogs/public
- Update Blogs: /blogs/blog id, with JWT 
- Delete Blog: /blogs/blog id, with JWT 

## Middleware
- Mongoose/MongoDB config: /config/mongoConfig.js --> Require 'mongoose' and connect to and process it using the .env file's MONGODB_URI link.
(Make sure to list .env in the .gitignore file to hide MongoDB password!!!)
- JWT: /middleware/authMiddleware.js --> Require 'jsonwebtoken', verify and process it using .env's SECRET_KEY.
(Make sure to list .env in the .gitignore file to hide SECRET_KEY!!!)
This get's the token from the header in postman and matches/verifies token sent. Error messages send if either token was not created or is not valid (tampered with, doesn't match or expires)

