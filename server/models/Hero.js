const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
})

module.exports = mongoose.model('Hero', schema)