const express = require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const connectToMongodb = require('./db.js');
const userModel = require('./User.js');
const postModel = require('./Post.js');

const app = express();
const PORT = 8000;
app.use(bodyParser.json());
connectToMongodb()

// Mongoose Queries-1: Create-> Model.Create()
// Route to create a user

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
app.post('/post', async (req,res)=>{
  try{
    const postData= req.body;
    const newPost= await postModel.create(postData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newPost)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
// Mongoose Queries-2: Read-> Model.find()
// Route to fetch all user.

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

app.get('/userCount',async(req,res)=>{
  try{
    const condition =  {role: 'user'};// Specify the condition to count documents...
    const result =  await userModel.countDocuments(condition)
    res.json({result})
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Aggregation-1:Sample-Pipeline:
// Route to perform aggregation on user data

app.get('/userstats',async (req,res)=>{
  try{
    const Pipeline = [
      {
        $group: {
          _id:'$role',// Group by the role field..
          averageAge: {$avg:'$age'}// Calculate average age for each group,
        }
      }
    ]
    // use Model.aggregate() to perform aggregation..
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }

  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Create the Post...
app.post('/posts', async (req,res)=>{
  try{
    const postData= req.body;
    const newPost= await postModel.create(postData); // here create is used create new  user ...
    // let's test this...
    res.status(201).json(newPost)
  }
  catch(err){
    res.status(501).json({error:err.message})
  }
  
})
// Mongoose Aggregation-2:populate()
// Route to get posts and populate the author field

app.get('/posts',async(req,res)=>{
  try{
    // this populate will replace authors field with username email
    const result =  await postModel.find().populate('author','username email')
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-3: $match
// Route to perform aggregation with $match stage

app.get('/filteredUsers',async (req,res)=>{
  try{
    const minAge= parseInt(req.query.minAge) || 0;// here we get the min age for filtering the users
    // create the simple pipeline..
    const Pipeline = [
      {
        $match:{
          age: {$gte:minAge}
        }
      }
    ]
    const userData= await userModel.aggregate(Pipeline)
    res.json(userData)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-4: $project
// Route to perform aggregation with $project stage
// Let's see the simple example of it...
app.get('/usersprotection', async(req,res)=>{
  try{
    // Example aggregation pipeline with $project stage to select specific fields.
    const Pipeline =[
      {
        $project:{
          _id:0, // Exclude the id field
          username:1, // Include the username field..
          age:1,// include the age field
          role:1,// include the role field
          fullName:{
            $concat:[
              '$username','(', {$toString:'$age'},'years old',//convert age to string..
            ]
          }

        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $project stage..
    const result = await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})
// Mongoose Aggregation-5: $Group
// Route to perform aggregation with $group stage

app.get('/usergroup', async(req,res)=>{
  try{
    // Create the simple pipeline..
    const Pipeline = [
      {
        $group:{
          _id: '$role',// group by the role field
          averageAge: {$avg:'$age'}

        }
      }
    ]
    // use Model.aggregate() to perform aggregation with $group stage..
    const result =  await userModel.aggregate(Pipeline)
    res.json(result)
  }
  catch(err){
    res.status(505).json({error:err.message})
  }
})

// Mongoose Aggregation-6: $sort
// Route to perform aggregation with $sort stage

app.get('/sortedusers', async (req, res) => {
  try {
    // Example aggregation pipeline with $sort stage to sort users by age in descending order
    const pipeline = [
      {
        $sort: {
          age: 1, // Sort by the 'age' field in descending order
        },
      },
    ];

    // Use Model.aggregate() to perform aggregation with $sort stage
    const result = await userModel.aggregate(pipeline);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});