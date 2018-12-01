const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

//users
const router = require('./routers/api/user')
//require mongodbURI
const db = require('./config/keys').mongoLocalURI
// connect mongodb
mongoose.connect(db, { useNewUrlParser: true }).then(
  () => { console.log('Connect Success!') },
  () => { console.log('Connect Failed!') }
)

var app = express();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//create application/json parser
var jsonParser = bodyParser.json()

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.end('Hello')
})
app.use(urlencodedParser)
app.use(jsonParser)
app.use('/api/user', router)
app.listen(port, () => {
  console.log('The server is Running on ' + port);
})
