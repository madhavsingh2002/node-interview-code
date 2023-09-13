const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.send('Hello Ji!')
})
// Question-2: How to Create the Api
app.get('/api/user',(req,res)=>{
    const user ={
        name: 'Madhav singh',
        email: "mail@gami.com"
    };
    res.json(user)
})  
app.listen(8000,()=>{
    console.log('Server is running on port')
})
// Thank for watching......