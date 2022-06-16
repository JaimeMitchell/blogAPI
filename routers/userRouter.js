// get the EXPRESS for our route
const express = require('express')
// make a Router
const router = express.Router()

// get the SCHEMA
const userModel = require('../models/userSchema')

//EXPRESS-VALIDATOR's 2 functions we need
const { check, validationResult } = require('express-validator')

//get the SALT 
const bcrypt = require('bcrypt')
// get the JWT (json web token)
const jwt = require('jsonwebtoken')

//* GET USERS
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
})

// ??? CREATE OR REGISTER A NEW USER, Why is .notEmpty producing an error message. The logic seems reversed and incorrect with all of these checks.
router.post('/new', [
    check('username', 'username is required from MIDDLEWARE').notEmpty(),
    check('email', 'Incorrect Email from MIDDLEWARE').isEmail(),
    check('password', 'Enter an email').notEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],
    async (req, res) => {
        // ASSIGN THE REQUESTED BODY TO USERDATA
        const userData = req.body

        // ? WHY IS VALIDATION RESULT THE VALUE OF ERROR?? Because we are trying to be specific about any errors the front-end users might not see.
        const errors = validationResult(req)
        //Check validation errors
        if (!errors.isEmpty()) {
            return res.json(errors.array())
        }

        try {
            // TRY/AWAIT the User's Schema finds required body's email.
            const userExist = await userModel.findOne({ email: userData.email })

            // ?? if user exists it says User exist or user name taken
            if (userExist) {
                return res.json({ msg: "User already exist or Username taken!" })
            }

            //* ==== Create New User
            // 1 Create the salt
            const SALT = await bcrypt.genSalt(10)

            // 2 use the salt to create a hash with the user's password
            const hashedPassword = await bcrypt.hash(userData.password, SALT)

            // 3 assign the hashed password to the userData
            userData.password = hashedPassword

            // Write the user to the db
            const user = await userModel.create(userData)

            // Create a new JWT Token
            //Nope don't understand what's happening here. Need to watch a youtube...
            const payload = {
                id: user._id,
                email: user.email
            }
            //What EXACTLY is happening here?
            const SECRET_KEY = 'MY_SECRET_KEY'
            //WHAT is jwt.sign?
            const TOKEN = jwt.sign(payload, SECRET_KEY)

            res.status(201).json({
                user: user,
                token: TOKEN
            })
            //Here's the catch error token wasn't created.
        } catch (error) {
            console.log(error)
            res.status(400).json('Bad request!!!!!')
        }


    })
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await userModel.findById(id)
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error)
    }
})

//UPDATE USER
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newUsersData = req.body
    try {
        //find user by id
        await userModel.findByIdAndUpdate(id, newUsersData, { new: true })
        res.status(200).json({ msg: 'user was updated' })
    }
    catch (error) {
        console.log(error)
    }
})

//DELETE A USER
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        //find user by id and DELETE!
        await userModel.findByIdAndDelete(id)
        res.status(200).json({ msg: 'user was deleted' })
    }
    catch (error) {
        console.log(error)
    }

})

// Export express router
module.exports = router


