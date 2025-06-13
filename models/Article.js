const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Article', ArticleSchema);