const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  category: {
    type: String
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Task', schema)