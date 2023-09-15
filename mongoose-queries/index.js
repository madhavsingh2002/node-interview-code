const express = require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const connectToMongodb = require('./db.js');
const userModel = require('./User.js');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());
connectToMongodb()

app.post('/users', async (req, res) => {
    try {
      const userData=req.body;
      const newUser = await userModel.create(userData)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});