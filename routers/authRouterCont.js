const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require("bcrypt")
const contactsModel = require("../models/contactsSchema")

const router = express.Router()

//ROUTER POST FOR LOGIN
router.post('/', [
    //CHECK
    check("name", "Please provide a name").notEmpty(),
    check("email", "Please provide valid email").isEmail(),
    //ASYNC
], async (req, res) => {
    //REQ.BODY
    const contactData = req.body
    const errors = validationResult(req)
    //IF ERROR ARRAY NOT EMPTY RETURN ARRAY
    if (!errors.isEmpty()) {
        return res.json(errors.array())
    }
    //TRY/CATCH/AWAIT IF THERE'S NO NAME, EMAIL OR PHONE RES.JSON ERROR MESSAGES AND SUCCESS MESSAGES
    try {
        const contact = await contactsModel.findOne({ name: contactData.name, email: contactData.email, phone: contactData.phone })

        if (!contact) {
            return res.json("Contact not found")
        }
        res.status(200).json("Success, contact found!")

    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error. Check Yourself!')
    }
})
module.exports = router