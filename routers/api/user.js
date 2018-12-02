// login,registerModule
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const secretOrKey = require('../../config/keys').secretOrKey
const passport = require('passport')

// $router GET /api/user/test
// @desc 返回请求的json数据
// @access public
// router.get('/test', (req, res) => {
//   res.json({ msg: 'User Login' })
// })

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
        var avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          identity: req.body.identity,
          avatar
        })
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
              console.log(err);
              return;
            } else {
              newUser.password = hash
              newUser.save().then(user => {
                res.json(user)
              }).catch(err => {
                res.json(err)
              })
            }
          });
        });
      }
    }
  )
})

// $router POST /api/user/login
// @desc 返回token jwt
// @access public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(404).json({ email: "User is not register" })
      return
    }
    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          id: user.id,
          name: user.name,
          identity: user.identity,
          avatar: user.avatar
        }
        // 数据 加密秘钥 过期时间
        const token = jwt.sign(rule, secretOrKey, { expiresIn: 3600 })
        res.json({ msg: "Login success", token: 'Bearer ' + token })
      } else {
        res.status(400).json({ msg: "Password is not match" })
      }
    });
  })
})

// $router GET /api/user/current
// @desc 返回 user
// @access private
// 验证token
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    identity: req.user.identity,
    avatar: req.user.avatar
  })
})

module.exports = router
