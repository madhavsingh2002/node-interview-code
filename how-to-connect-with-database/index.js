const express = require('express')
const connectToMongodb = require('./db.js')


const app = express()
app.get('/',(res,req)=>{
    res.send('Hello World!')
})
// Question-3: How to connect to Database.
//  Step-1: install mongoose and import it..
// Step-2: create the connect function for connect it to database...
// Step-3: Calling this connect function inside this index.js 
// Thanks for watching....
connectToMongodb()
app.listen(8000,(res,req)=>{
    console.log('Server is running')
})