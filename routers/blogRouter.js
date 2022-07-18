// Get Express and make a router
const express = require('express')
const router = express.Router()

const blogModel = require('../models/blogSchema')
const authMiddleware = require('../middleware/authMiddleware')

// GET BLOG
router.get('/', authMiddleware, async (req, res) => {
    try {
        const blog = await blogModel.find()
        res.status(200).json(blog)
    } catch (error) {
        console.log(error)
    }
})
//FILTER PUBLIC BLOGS
router.get('/public', authMiddleware, async (req, res) => {
    try {
        const public = await blogModel.find({ "private": "false" })
        res.status(200).json(public)
    } catch (error) {
        console.log(error)
    }
})
// CREATE BLOGS
router.post('/new', authMiddleware, async (req, res) => {
    const blogData = req.body // gets the data from the request
    //What does this do and how does it work?
    blogData.user = req.user.id
    console.log(blogData);
    try {
        const blog = await blogModel.create(blogData) // create the blog in the db
        // send back the response
        res.status(201).json(blog)
        // res.status(201).json({data: blog})
    } catch (error) {
        console.error(error)
        res.status(400).json('NOPE!')
    }
})


// GET BLOGS BY ID
router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    console.log(req.user);

    try {
        const blog = await blogModel.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        console.error(error)
        res.status(400).json({
            msg: "Your blog ID can not be found :("
        })
    }
})


// UPDATE Blog BY ID
router.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const newBlogData = req.body
    try {
        // find the blog by the id
        const blog = await blogModel.findByIdAndUpdate(id, newBlogData, { new: true })
        res.status(202).json(blog)
    } catch (error) {
        console.log(error)
    }
})

// DELETE A BLOG. I erased the unused variable const blog, but have it commented out on line 73
router.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    console.log('FROM DELETE', req.user);

    try {
        //Finds the blog user wants to delete by its id
        await blogModel.findByIdAndDelete(id)
        console.log(blogToDelete);
        console.log(blogToDelete.user._id.toString(), '||', req.user.id);
        // This checks that the user who created the Blog is the one asking to delete blog, by checking their IDs.
        if (blogToDelete.user._id.toString() !== req.user.id) {
            // if they ARE NOT I send error message
            return res.status(400).json({ msg: 'Not Authorized!' })
        }
        await blogModel.findByIdAndDelete(id)
        res.status(200).json({ msg: 'Blog was deleted!' })

    } catch (error) {
        console.log(error);
    }

    // try {
    //     const blog = await blogModel.findByIdAndDelete(id)
    //     res.status(200).json({ msg: 'Blog was deleted!' })
    // } catch (error) {
    //     console.log(error);
    // }
})

module.exports = router