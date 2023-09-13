const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Create an Express.js server that handles both GET and POST requests to a "/api/user" endpoint.
// For GET requests, it should respond with a JSON object containing user data (e.g., name and age). 
// For POST requests, it should accept JSON data representing a new user and add it to a list of users.
// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Initialize an array to store user data
const users = [];

// GET request to retrieve user data
app.get('/api/user', (req, res) => {
  res.json(users);
});

// POST request to add a new user
app.post('/api/user', (req, res) => {
  const newUser = req.body;
  if (newUser && newUser.name && newUser.age) {
    users.push(newUser);
    res.status(201).json(newUser); // Respond with the added user
  } else {
    res.status(400).json({ error: 'Invalid user data' });
  }
});
app.listen(8000,(res,req)=>{
    console.log('Server is running')
})