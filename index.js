const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Quiz questions
const questions = [
    { id: 1, question: "What is 2 + 2?", answer: "4" },
    { id: 2, question: "What is the capital of France?", answer: "Paris" },
    
];

// Routes
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.post('/api/submit', (req, res) => {
    const { id, answer } = req.body;
    const question = questions.find(q => q.id === id);
    if (!question) {
        return res.status(404).send('Question not found');
    }
    if (question.answer === answer) {
        res.send('Correct!');
    } else {
        res.send('Incorrect!');
    }
});

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz App!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
