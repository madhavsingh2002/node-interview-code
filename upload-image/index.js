const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// POST request to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ message: 'Image uploaded successfully' });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
