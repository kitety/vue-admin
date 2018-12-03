// login,registerModule
const express = require('express')
const router = express.Router();
const passport = require('passport')
const Profile = require('../../models/profile')


// $router GET /api/profile/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'Profile Works' })
})

module.exports = router
