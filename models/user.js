const mongoose = require('mongoose');

// Schema
const UserSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// 注意本地collection的是复数的users
let User = module.exports = mongoose.model('User', UserSchema);
