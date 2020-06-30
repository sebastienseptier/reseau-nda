const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum : ['ECOLE','COLLEGE','LYCEE','ETUDES SUPERIEURES','GENERAL'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Post', postSchema)