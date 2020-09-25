var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const post = mongoose.model('post', UserSchema)

export default post
