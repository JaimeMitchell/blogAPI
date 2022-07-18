const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        username: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },

        password: {
                type: String,
                required: true
        },
        created_at: {
                type: Date,
                default: Date.now()
        },
        //This was added in another lesson. Get clarification on Monday.
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
        }
})

module.exports = mongoose.model('User', userSchema)