//this produces the token in POSTMAN.
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //get token from headers object in Postman after you create and send a new user or blog. Click on the headers, x-auth-token goes in 'key', then copy and past the hash token in 'value'.
    const token = req.header('x-auth-token')

    // IF NO TOKEN IS DEFINED ABOVE
    if (!token) {
        return res.json('NO TOKEN, ACCESS DENIED')
    }
    // IF WE HAVE A TOKEN PROCESS IT USING SECRET_KEY USING DOTENV (.env file)
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded)

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json('TOKEN NOT VALID')
    }

}