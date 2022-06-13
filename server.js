const express = require('express')
const app = express()
const PORT = 3000
const morgan = require('morgan')
const helmet = require('helmet')


app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'API is up'
    })
})
app.listen(PORT, () => {
    console.log(`PORT running on ${PORT}`)
    mongoConfig()
})