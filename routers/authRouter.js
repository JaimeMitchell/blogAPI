//AUTH ROUTER IS SPECIFICALLY FOR SIGN

// SET UP EXPRESS
const express = require('express')
// SET UP EXPRESS-VALIDATOR NPM

//
const router = express.Router()
//
const { check, validationResult } = require('express-validator')
// SET UP PASSWORD ENCRYPTION NPM
const bcrypt = require('bcrypt')
// SET UP https://jwt.io/
const jwt = require('jsonwebtoken')
// Requiring only the user schema for password validation
const UserModel = require('../models/userSchema')

//Don't fully understand where this posts to and how. Is it the root of Users?
// EXPRESS-VALIDATION checks/.ismail().notEmpty()
router.post('/', [

    check("email", "Please provide a valid email").isEmail(),

    check("password", "Enter your password!").notEmpty()

], async (req, res) => {
    const userData = req.body
    const errors = validationResult(req)
    // Checks for validation errors
    if (!errors.isEmpty()) {
        return res.json(errors.array())
    }

    try {//try 'user' value is userSchema's email by finding it in the request body
        // Find the user with the provided email
        const user = await UserModel.findOne({ email: userData.email })
        //if there's no user found return an error message
        if (!user) {
            return res.json('User not found!')
        }

        // Compare the plain text password to hashed password if there's a match BTWN AuthRoute's req body and it's Schema's email with req body in it, not sure what makes one hashed and the other plain text.
        const isMatch = await bcrypt.compare(userData.password, user.password)
        // if bcrypt comparison is not a match then tell them
        if (!isMatch) {
            return res.json('Password is not a match!')
        }

        // Create a new JWT Token
        //Nope don't understand what's happening here. Need to watch a youtube...
        const payload = {
            id: user._id,
            email: user.email
        }
        //WHAT is jwt.sign?
        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY) //{ expiresIn: "2 Days" })

        res.status(201).json({
            user: user,
            token: TOKEN
        })
        //Here's the catch error token wasn't created.
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error, token not created')
    }
})

// Export express router
module.exports = router