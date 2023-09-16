const express = require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const connectToMongodb = require('./db.js');
const userModel = require('./User.js');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());
connectToMongodb()

// Mongoose Queries-1: Create-> Model.Create()
// Route to create a user
// Let's see the example of Model.Create()
app.post('/users', async (req,res)=>{
  try{
    const userData= req.body;
    const newUser= await userModel.create(userData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newUser)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
// Mongoose Queries-2: Read-> Model.find()
// Route to fetch all user.
// Let's see the example of Model.find()
app.get('/users', async (req,res)=>{
  try{
    const users = await userModel.find() // Help us to find all the users...
    res.json(users);
  }
  catch(err){
    res.status(500).json({error: err.message})
  }
})

// Mongoose Queries-3: Read-> Model.findById()
// Route to fetch a user by ID
// Let's the example of Model.findById...
app.get('/users',async (req,res)=>{
  try{
    const userId = req.params.id
  // Use Model.findById() to retrieve a user..
  const user = await userModel.findById(userId);
  // just the condition if user not present..
  if(!user){
    res.status(404).json({error:'user not found'})
  }
  res.json(user)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})

// Mongoose Queries-4: Read-> Model.findOne()
// Route to fetch a user by a condition (e.g., username)
app.get('users', async(req,res)=>{
  try{
     const condition = req.query.username;// get the condition from query parameters.

     // use Model.findOne() to retrieve a user by a condition...
    const user = await userModel.findOne({username:condition});
    if(!user){
      return res.status(404).json({error: 'user not found'})
    }
    res.json(user)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})

// Mongoose Queries-5: Update-> Model.updateOne()
// Route to update a user by a condition (e.g., username)

app.put('/users/:username', async (req,res)=>{
  try{
    const condition = req.params.username;// get the conditions from route Parameters.
    const UpdatedData= req.body;
    // use Model.UpdateOne() to updated a user by a condition..
    const result = await userModel.updateOne({username:condition},UpdatedData)
    if(result.nModified===0){
      return res.status(404).json({error:'User not found or no changes were made'})
    }
    res.json({message:'user Updated successfully'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-6: Update-> Model.updateMany()
// Route to update multiple users by a condition (e.g., age)
app.put('/users', async (req, res) => {
  try {
    const condition = req.query.age; // Get the condition from query parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Use Model.updateMany() to update multiple users by a condition
    const result = await userModel.updateMany({ age: condition }, updatedData);

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'No users found or no changes were made' });
    }

    res.json({ message: 'Users updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});