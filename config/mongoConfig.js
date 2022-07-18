// require Mongoose to connect MongoDB. This connects our Schemas to use in Postman!
const mongoose = require('mongoose')
//USE ASYNC TO CONNECT VIA THE DOTENV (.env file)
module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        mongoose.connection
        console.log('MongoDB Connected!')
    } catch (error) {
        console.log(error)
    }
}