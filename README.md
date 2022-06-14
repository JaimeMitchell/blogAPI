# blogAPI
## NPMs Used:
bcrypt
dotenv 
ejs
express
express-validator
helmet
jsonwebtoken
mongoose
morgan

## Apps Used:
NodeJS
Express
MongoDB
Mongoose
Postman
Github
Heroku
VSC as my editor

## Env
MONGODB_URI
SECRET_KEY

## Endpoints,Parameters,Schema
### CRUD:
- Create User: /users/new
- Read all Users: /users
- Read User by ID: /users/:id
- Update User: /users/:id
- Delete User: /user/:id

- Create Blog: /blogs/new
- Read all Blogs by Users: /blogs with JWT provided
- Read individual Users blogs: /blogs 
- Filter Public blogs: /blogs/public
- Update Blog: /blogs
- Delete Blog: /blogs

## Loading Instructions
1. Run 'nodemon server.js' in terminal to start app
2. Run postman to Create, Read, Update and Delete all Users and individual User blogs by entering User's JWT in Postman's headers. Key: x-auth-token key: the JWT token provided when user is created.
