const express = require('express');
const router = express.Router();
const quizData = require('../data/quizData');
const commentData = require('../data/commentData');

router.get('/', (req, res) => {
    const quizzes = quizData.getAllQuizzes();
    res.render('quizPage', { quizzes, showForm: false });
});

router.get('/new', (req, res) => {
    res.render('quizPage', { quizzes: [], showForm: true });
});

router.post('/', (req, res) => {
    const { userId, question, options, answer } = req.body;
    const newQuiz = quizData.createQuiz(userId, question, options.split(','), answer);
    res.redirect(`/quizzes/${newQuiz.id}`);
});

router.get('/:quizId', (req, res) => {
    const quizId = parseInt(req.params.quizId);
    const quiz = quizData.getQuizById(quizId);
    const comments = commentData.getCommentsByQuizId(quizId);
    res.render('quizPage', { quizzes: [], quiz, comments, showForm: false });
});

module.exports = router;
