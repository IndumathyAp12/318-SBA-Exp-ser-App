const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
};

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization === "Bearer your-token") {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Questions data
const questions = [
    { id: 1, question: "What is 2+2?", answer: "4" },
    { id: 2, question: "What is the capital of France?", answer: "Paris" }
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

// User Routes
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const quizRoutes = require('./routes/quizRoutes');

app.use('/users', authMiddleware, userRoutes);
app.use('/comments', authMiddleware, commentRoutes);
app.use('/quizzes', authMiddleware, quizRoutes);

// Root route handler
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
});

app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
