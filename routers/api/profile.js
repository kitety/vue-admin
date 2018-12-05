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

// $router POST /api/profile/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {}
  if (req.body.type) profileFields.type = req.body.type
  if (req.body.describe) profileFields.describe = req.body.describe
  if (req.body.income) profileFields.income = req.body.income
  if (req.body.expend) profileFields.expend = req.body.expend
  if (req.body.cash) profileFields.cash = req.body.cash
  if (req.body.remark) profileFields.remark = req.body.remark
  new Profile(profileFields).save().then(profile => {
    res.json(profile)
  })
})

// $router GET /api/profile
// @desc 获取全部信息
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.find().then((result) => {
    if (!result) {
      return res.status(404).json({ msg: '没有任何内容' })
    } else {
      res.json(result)
    }
  }).catch((err) => {
    return res.status(400).json(err)
  });
})

// $router GET /api/profile/:id
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  //findOne({_id:req.params.id})
  Profile.findById(req.params.id).then((result) => {
    if (!result) {
      return res.status(404).json({ msg: '没有任何内容' })
    } else {
      res.json(result)
    }
  }).catch((err) => {
    return res.status(400).json(err)
  });
})

// $router POST /api/profile/edit
// @desc 编辑信息
// @access private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFields = {}
  if (req.body.type) profileFields.type = req.body.type
  if (req.body.describe) profileFields.describe = req.body.describe
  if (req.body.income) profileFields.income = req.body.income
  if (req.body.expend) profileFields.expend = req.body.expend
  if (req.body.cash) profileFields.cash = req.body.cash
  if (req.body.remark) profileFields.remark = req.body.remark
  Profile.findOneAndUpdate(
    { _id: req.params.id },
    { $set: profileFields },
    { new: true }
  ).then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.status(400).json(err)
  });
})

// $router DELETE /api/profile/delete:id
// @desc 删除信息
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findByIdAndRemove(
    { _id: req.params.id }
  ).then((profile) => {
    profile.save().then((result) => {
      return res.json(result)
    })
  }).catch((err) => {
    return res.status(400).json({ msg: 'Delete Failed.' })
  });
})
module.exports = router
