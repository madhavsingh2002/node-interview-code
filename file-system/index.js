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


app.get('/create/open',async(req,res)=>{
    fs.open('newfile2.txt','w',(err,file)=>{
        if(err){
            console.error(err)
            res.status(500).send('Internal server error')
            return;
        }
    })
    console.log('File Created');
    res.send('File newfile2.txt created')
})

// CREATE: fs.writeFile.

app.get('/create/writefile',async(req,res)=>{
    const contentToWrite = 'Hello Content'
    fs.writeFile('newfile3.txt',contentToWrite,(err)=>{
        if(err){
            console.error(err)
            res.status(505).send('Internal Server Error')
            return;
        }
    })
    console.log('File Saved')
    res.send('File newfile3.txt saved')
})

// Update: fs.appendFile().

app.get('/update/appendfile', (req, res) => {
    const contentToAppend = ' This is my text.\n';
  
    fs.appendFile('newfile.txt', contentToAppend, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      console.log('File updated!');
      res.send('Content appended to mynewfile1.txt');
    });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
