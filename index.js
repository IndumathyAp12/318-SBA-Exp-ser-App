const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory data store
let users = [];
let quizzes = [];
let comments = [];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz App API');
});

// User Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Quiz Routes
app.get('/api/quizzes', (req, res) => {
  res.json(quizzes);
});

app.post('/api/quizzes', (req, res) => {
  const newQuiz = {
    id: quizzes.length + 1,
    userId: req.body.userId,
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer
  };
  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
});

app.put('/api/quizzes/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  quiz.question = req.body.question || quiz.question;
  quiz.options = req.body.options || quiz.options;
  quiz.answer = req.body.answer || quiz.answer;

  res.json(quiz);
});

app.delete('/api/quizzes/:id', (req, res) => {
  const quizIndex = quizzes.findIndex(q => q.id === parseInt(req.params.id));
  if (quizIndex === -1) return res.status(404).json({ message: 'Quiz not found' });

  quizzes.splice(quizIndex, 1);
  res.json({ message: 'Quiz deleted' });
});

// Comment Routes
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const newComment = {
    id: comments.length + 1,
    quizId: req.body.quizId,
    userId: req.body.userId,
    text: req.body.text
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.put('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  comment.text = req.body.text || comment.text;

  res.json(comment);
});

app.delete('/api/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });

  comments.splice(commentIndex, 1);
  res.json({ message: 'Comment deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
