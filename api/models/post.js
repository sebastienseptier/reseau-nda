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
    enum : ['Boite à idées', 'Culture', 'Papotages & souvenirs', 'Associations & clubs', 'Evénements', 'Jobs [Offres et demandes]'],
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