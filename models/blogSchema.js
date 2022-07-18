const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        date: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('blogs', blogSchema)