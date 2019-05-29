const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

schema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
  justOne: false
})

schema.virtual('latestNews', {
  ref: 'News',
  localField: '_id',
  foreignField: 'categories',
  justOne: false
})

module.exports = mongoose.model('Category', schema)