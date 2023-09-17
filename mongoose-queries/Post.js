const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // Reference to the User model
    },
  });
  const postModel= mongoose.model('post',userSchema)
  module.exports=postModel