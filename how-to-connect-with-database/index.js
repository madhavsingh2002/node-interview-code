const express = require('express')
const connectToMongo  = require('./db.js')
const app = express()
app.get('/',(res,req)=>{
    res.send('Hello World!')
})
connectToMongo()
app.listen(8000,(res,req)=>{
    console.log('Server is running')
})