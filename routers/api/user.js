// login,registerModule
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
const User = require('../../models/user')

// $router GET /api/user/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'User Login' })
})

// $router POST /api/user/register
// @desc 返回请求的json数据
// @access public
router.post('/register', (req, res) => {
  // res.json(req.body);
  // 查询数据库是否有邮箱
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (user) {
        return res.status(400).json({ email: 'email is exist!' })
      } else {
        const newUser = new User(req.body)
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
              console.log(err);
              return;
            } else {
              newUser.password = hash
              newUser.save(err => {
                if (err) {
                  console.log(err);
                  res.status(404).json({ msg: 'Add Failed!' })
                } else {
                  res.json({ msg: 'Add Success!' })
                }
              })
            }
          });
        });
      }
    }
  )
})

module.exports = router
