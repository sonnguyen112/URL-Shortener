require('dotenv').config();
const express = require('express');
const cors = require('cors');
const URL = require("./config/db")
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(express.urlencoded())
app.use(express.json())

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use("/api", require("./routes/api"))

console.log(process.env.PORT)
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
