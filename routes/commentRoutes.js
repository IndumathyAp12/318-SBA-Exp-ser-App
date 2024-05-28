const express = require('express');
const router = express.Router();
const commentData = require('../data/commentData');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === '12345') {  
      next();
  } else {
      res.status(401).send('Unauthorized');
  }
};


router.get('/', (req, res) => {
  const comments = commentData.getAllComments();
  res.json(comments);
});

router.post('/', (req, res) => {
  const { quizId, userId, text } = req.body;
  const newComment = commentData.createComment(quizId, userId, text);
  res.status(201).json(newComment);
});

module.exports = router;
