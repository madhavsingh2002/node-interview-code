const express = require('express');
const fs = require('fs');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  fs.readFile('demo.html', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
