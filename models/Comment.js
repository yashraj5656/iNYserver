const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId, // ensures reference to Article
    ref: 'Article',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
