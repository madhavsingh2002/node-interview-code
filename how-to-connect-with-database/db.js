const mongoose = require('mongoose')
const connectToMongo = async()=>{
    const res =  await mongoose.connect('mongodb://127.0.0.1:27017/todo-list')
    res && console.log('Connect to Database')

}
module.exports = connectToMongo;