// Question-5: How to Upload file using Multer....
// Step-1: Create the server...
const express =require('express')
const multer =require('multer')
const path = require('path')
const app =express()
//  Middleware to serve static files from the "public"
app.use(express.static(path.join(__dirname,'public')))
// Configure Multer for handling file Uploads...
const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'uploads/');// create the uploads folder...
  },
  filename:function(req,file,cb){
    const ext = path.extname(file.originalname)
    cb(null,Date.now() +ext)
  }
})
const upload = multer({storage:storage});
// POST request to handle image uploads...
app.post('/uploads',upload.single('image'),(req,res)=>{
  if(req.file){
    res.json({message:'Image Uploaded Successfully'})
  }
  else{
    res.status(400).json({error:'No file Uploaded'})
  }
})

// For Creating the Question we required MULTER and PATH.., import them 
app.listen(8000,()=>{
  console.log('Server is Running...')
})
// Let's test the Api
// Thank's for Watching....