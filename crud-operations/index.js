// Hello! Everyone, Let's Perform CRUD Operation in Node.js
// Step-1: Create the Server...
// Step-2: Connect to Locol Database using mongoose...
// Step-3: Define schema and model...
// Step-4: Create Api for CRUD...
// Step-5: First create a new task api...
// Step-6: Read All tasks...
const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
//  Middleware to parse json data from request...
app.use(bodyParser.json())
const app = express()

// MongoDB Connection...
mongoose.connect('mongodb://127.0.0.1:27017/crud',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

// Task Schema and Model...
const taskSchema = new mongoose.Schema({
  title:String,
  description:String,
  completed:Boolean
})
const Task = mongoose.model('Task',taskSchema);// Model

// Create a new task...
app.post('/tasks',async(req,res)=>{
  try{
    const newTask = new Task(req.body);
    await newTask.save()
    res.status(201).json(newTask)
  }
  catch(err){
    res.status(400).json({error:err.message})
  }
})

// Read All tasks
app.get('/tasks/:id',async(req,res)=>{
  try{
    const task = await Task.find();
    res.json(task)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Read a specific task by its ID;
app.get('tasks/:id',async(req,res)=>{
  try{
    const task = await Task.findById(req.params.id)
    if(!task){
      return res.status(404).json({error:'task not found'})

    }
    res.json(task)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Update a task by its ID
app.put('/tasks/:id',async(req,res)=>{
  try{
    const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{
      new:true
    })
    if(!updatedTask){
      return res.status(404).json({error:'task not found'})
    }
    res.json(updatedTask)
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
// Delete a task by its ID
app.delete('/task/:id',async(req,res)=>{
  try{
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if(!deletedTask){
      return res.status(404).json({error:'task not found'})
    }
    res.json({message:'task Deleled'})
  }
  catch(err){
    res.status(500).json({error:err.message})
  }
})
app.listen(8000,()=>{
  console.log("Server is Running...")
})