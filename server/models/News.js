const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
})

schema.virtual('categoryName').get(function () {
  return this.categories[0].name
})

module.exports = mongoose.model('News', schema)