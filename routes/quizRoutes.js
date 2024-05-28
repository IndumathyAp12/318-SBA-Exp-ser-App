const express = require('express');
const router = express.Router();
const quizData = require('../data/quizData');

router.get('/', (req, res) => {
    const quizzes = quizData.getAllQuizzes();
    res.json(quizzes);
});

router.post('/', (req, res) => {
    const { userId, question, options, answer } = req.body;
    const newQuiz = quizData.createQuiz(userId, question, options, answer);
    res.status(201).json(newQuiz);
});

module.exports = router;
