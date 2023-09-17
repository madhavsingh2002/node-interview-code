const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    role: String,
    // ... other user properties
  });
  const userModel= mongoose.model('user',userSchema)
  module.exports=userModel