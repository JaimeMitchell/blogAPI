//set up the npms
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
//Don't forget our new friend cors
const cors = require('cors')

// INITIALIZE DOTENV WHICH CONNECTS MONGODB TO MONGOOSE MODELS AND GETS THE ACCESS TOKEN FOR NEW USERS AND WHEN USERS LOGIN
require('dotenv').config()

//connect the configuration of mongoose to mongoDB and then to this server which is connected to all the routers, which are in turn connected to all the models. This file is the API's GRAND CENTRAL STATION
const mongoConfig = require('./config/mongoConfig')

//CONNECT ALL THE ROUTERS
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')
const authRouter = require('./routers/authRouter')
//Our new front-end Friends

//USE MIDDLEWARE i need to research each one and leave a comment on each of them here.
app.use(express.json())
app.use(morgan('dev'))
//hides security features, browser using and other info
app.use(helmet())
//Cors allows us to make requests from other urls other than the origin so front-end on port 3000 and back-end on port 4000 can play nicely together
app.use(cors())


//set up the LOCALHOST PORT 
// process.env.PORT makes sure it runs on Heroku FIRST, before going local.
const PORT = process.env.PORT || 4000

// app.use mounts the middleware functions which these routes hold. These are the trains that enter Grand Central station with their goods.
app.use('/user', userRouter)
app.use('/blog', blogRouter)
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