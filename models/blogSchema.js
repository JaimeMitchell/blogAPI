const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        date: Date.now()
    },
    blog_title: {
        type: String,
        required: true
    },
    blog_content: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('blogs', blogSchema)