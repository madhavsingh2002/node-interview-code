// Question-1: How to Create server in Node.js using express.js
// step-1: install and import Express
const express = require('express')
const app = express();
// simple route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
// Listening server
app.listen(8000,()=>{
    console.log('Server is Running on Port 8000')
})
// done 