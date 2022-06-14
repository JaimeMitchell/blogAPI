//set up the npms
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')

// INITIALIZE DOTENV WHICH CONNECTS MONGODB TO MONGOOSE MODELS AND GETS THE ACCESS TOKEN FOR NEW USERS AND WHEN USERS LOGIN
require('dotenv').config()

//connect the configuration of mongoose to mongoDB and then to this server which is connected to all the routers, which are in turn connected to all the models. This file is the API's GRAND CENTRAL STATION
const mongoConfig = require('./config/mongoConfig')

//CONNECT ALL THE ROUTERS
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')
const authRouter = require('./routers/authRouter')

//USE MIDDLEWARE i need to research each one and leave a comment on each of them here.
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())


//set up the LOCALHOST PORT 
const PORT = 3000

// app.use mounts the middleware functions which these routes hold. These are the trains that enter Grand Central station with their goods.
app.use('/users', userRouter)
app.use('/blogs', blogRouter)
app.use('/auth', authRouter)

//Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API is up"
    })
})
app.listen(PORT, () => {
    console.log(`PORT running on ${PORT}`)
    mongoConfig()
})