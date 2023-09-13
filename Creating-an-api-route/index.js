const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.send('Hello Ji!')
})
app.get('/api/user', (req, res) => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    res.json(user);
  });
  
app.listen(8000,()=>{
    console.log('Server is running on port')
})