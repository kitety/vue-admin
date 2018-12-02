const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
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
// 引用passport配置文件
require('./config/passport')(passport)

const port = process.env.PORT || 5000;
var app = express();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//create application/json parser
var jsonParser = bodyParser.json()
// passport 初始化
app.use(passport.initialize());

// app.get('/', (req, res) => {
//   res.end('Hello')
// })
app.use(urlencodedParser)
app.use(jsonParser)
app.use('/api/user', router)
app.listen(port, () => {
  console.log('The server is Running on ' + port);
})
