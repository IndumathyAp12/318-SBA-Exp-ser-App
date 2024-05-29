const express = require('express');
const router = express.Router();
const commentData = require('../data/commentData');

router.get('/', (req, res) => {
  const comments = commentData.getAllComments();
  res.json(comments);
});

router.get('/quiz/:quizId', (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const comments = commentData.getCommentsByQuizId(quizId);
  res.render('comments', { quizId, comments });  
});

router.post('/', (req, res) => {
  const { quizId, userId, text } = req.body;
  const newComment = commentData.createComment(quizId, userId, text);
  res.status(201).json(newComment);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = commentData.deleteComment(id);
  if (!success) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.sendStatus(204);
});

module.exports = router;
