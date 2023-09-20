const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;



// READ: fs.readFile.

app.get('/readfile',async(req,res)=>{
    fs.readFile('demo.html',(err,data)=>{// here demo.html is file that we want to read.
        if(err){
            console.error(err);
            res.status(500).send('Internal server error')
            return
        }
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end()
    })
})

// CREATE: fs.appendFile.

app.get('/create/appendfile', (req, res) => {
    const contentToAppend = 'Hello content!';
  
    fs.appendFile('mynewfile1.txt', contentToAppend, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('Saved!');
      res.send('Content appended to mynewfile1.txt');
    });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
