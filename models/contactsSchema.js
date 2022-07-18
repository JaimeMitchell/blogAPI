const mongoose = require('mongoose')

const contactsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: { type: String },


    contactType: {
        type: String,
        default: 'personal'
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('contacts', contactsSchema)