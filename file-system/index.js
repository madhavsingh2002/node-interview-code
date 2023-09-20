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

app.get('/create/appendfile',async(req,res)=>{
    const contentToAppend ='Hello Content';
    fs.appendFile('newfile.txt',contentToAppend,(err)=>{
        
        if(err){
            console.error(err)
            res.status(505).send('Interval Server Error')
            return
        }
        console.log('Saved')
        res.send('Content Appended to newfile.txt')
    })
})

// CREATE: fs.open.

app.get('/create/open', (req, res) => {
    fs.open('newfile.txt', 'w', (err, file) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('File created!');
      res.send('File mynewfile2.txt created');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
