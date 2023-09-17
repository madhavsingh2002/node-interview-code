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
app.put('/users',async(req,res)=>{
  try{
    const condition = req.query.age;// Get the condition from query Parameters.
    const updatedData=req.body; // Get the updated body from the request body.
    // Use Model.UpdateMany() to update multiple users by a condition..
    const result = await userModel.updateMany({age:condition},updatedData);
    if(result.nModified===0){
      return res.status(404).json({error:'No users found'})
    }
    res.json({message:'Users updated successfully'})

  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-7: Update-> Model.findOneAndUpdate()
// Route to find and update a user by a condition (e.g., username)
// Let's see the example of it.....
app.put('/users/:username',async(req,res)=>{
  try{
    const condition = req.params.username;// Get the condition from route Parameters
    const updatedData= req.body;// Get the Updated Data from the request body.

    const userData = await userModel.findOneAndUpdate({username:condition},updatedData,{
      new:true,
      runValidators: true
    })
    if(!user){
      res.status(404).json({message:'User not found'})
    }
    res.json(userData)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
})
// Mongoose Queries-8: Update-> Model.findByIdAndUpdate()
// Route to find and update a user by ID
// Let's see the example of it...
app.put('/user/:id', async(req,res)=>{
  try{
    const userId = req.params.id;// get the user Id from route Parameters.
    const updatedBody =req.body; 
    const userData = await userModel.findByIdAndUpdate(userId,updatedBody,{
      new: true,
      runValidators:true
    })
    if(!userData){
      res.status(404).json({message:'user not found'})
    }
    res.status(userData)
  }
  catch(err){
    res.json({error:err.message})
  }
})
// Mongoose Queries-9: Update-> Model.deleteOne()
// Route to delete a user by a condition (e.g., username)
// Let's the Example of it..
app.delete('/users/:username', async (req,res)=>{
  try{
    const condition = req.params.username;
    const result = await userModel.deleteOne({username:condition});
    if(result.deletedCount===0){
      return res.status(404).json({error:'User not Found'});
    }
    res.json({message:'User Deleted Successfully'})
  } 
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-10: Update-> Model.deleteMany()
// Route to delete multiple users by a condition (e.g., age)
// Let's see the example of it....
app.delete('/users',async (req,res)=>{
  try{
    const condition =  req.query.age;// Get the condition from query parameters...
    // Use Model.DeleteOne() to delete multiple users by a condition...
    const result =  await userModel.deleteMany({age:condition})
    if(result.deletedCount===0){
      return res.status(404).json({error:'User not found'})
    }
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Queries-11: Update-> Model.findOneAndDelete()
// Route to find and delete a user by a condition (e.g., username)
// Let's the example of it..
app.delete('/users/:username', async (req,res)=>{
  try{
    const condition =  req.params.username; // Get the condition from route Paramater..
    const user =  await userModel.findOneAndDelete({username:condition});
    if(!user){
      return res.status(404).json({error:'User not found'})
    }
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-12: Update-> Model.findByIdAndDelete()
// Route to find and delete a user by ID
// Let's see the example of it....
app.delete('/users/:id',async(req,res)=>{
  try{
    const condition = req.params.id; // Get the user Id....

    const result = await userModel.findByIdAndDelete(condition)
    if(!result){
      return res.status(404).json({error:'User not found'});
    }
    res.json({message:'User deleted Successfully'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Mongoose Queries-13: Model.countDocuments()
// Route to count documents that match a condition (e.g., users with a specific role)
app.get('/userCount', async (req, res) => {
  try {
    const condition = { role: 'user' }; // Specify the condition to count documents

    // Use Model.countDocuments() to count documents that match the condition
    const count = await userModel.countDocuments(condition);

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});