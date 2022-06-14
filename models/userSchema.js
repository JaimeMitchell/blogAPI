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
        birthday: {
                day: {
                        type: Number
                },
                month: {
                        type: Number
                },
                year: {
                        type: Number
                },
                age: {
                        type: Number

                },
                password: {
                        type: String,
                        required: true
                },
                created_at: {
                        type: Date,
                        default: Date.now()
                }
        }
})
module.exports = mongoose.model('user', userSchema)