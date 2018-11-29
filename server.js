const express = require('express');
var app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.end('Hello')
})
app.listen(port, () => {
  console.log('The server is Running on ' + port);
})
