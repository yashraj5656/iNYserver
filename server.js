const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Article = require('./models/Article');
const Comment = require('./models/Comment');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Optional: stop server if DB fails
  });


app.get('/articles', async (req, res) => {
  const articles = await Article.find().sort({ date: -1 });
  res.json(articles);
});

app.get('/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  const comments = await Comment.find({ articleId: req.params.id });
  res.json({ article, comments });
});

app.post('/articles', async (req, res) => {
  const newArticle = new Article(req.body);
  const saved = await newArticle.save();
  res.json(saved);
});

app.post('/comments', async (req, res) => {
  const newComment = new Comment(req.body);
  const saved = await newComment.save();
  res.json(saved);
});

app.listen(5000, () => console.log('Server running on port 5000'));
