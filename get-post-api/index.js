// Question-4: Create an Express.js server that handles both GET and POST requests to a "/api/user" endpoint.
// For GET requests, it should respond with a JSON object containing user data (e.g., name and age). 
// For POST requests, it should accept JSON data representing a new user and add it to a list of users.

// Step-1: Setup-Server.
// Step-2: Get Request...
// Step-3: Post Request...
// Step-4: use MiddleWare like body-parser.
// Step-5: Let's test the API
const express = require('express')
const bodyParser = require('body-parser')
const app =express()
// Middleware to parser JSON data from requests...
app.use(bodyParser.json())
// Get Request
const user =[]// to store the user Data;
app.get('/api/users',(req,res)=>{
  res.json(user);
})
// Post Request...
app.post('/api/users',(req,res)=>{
  const newUser = req.body;
  if(newUser && newUser.name && newUser.age){
    user.push(newUser);
    res.status(201).json(newUser)
  }
  else{
    res.status(400).json({error:'Invalid User Data'})
  }
  //else handling
})
app.listen(8000,(req,res)=>{
  console.log('Server is running')
})
