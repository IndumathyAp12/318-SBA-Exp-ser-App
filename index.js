const express = require('express');
const path = require('path');
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

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Questions data
const questions = [
    { id: 1, category: 'Geography', question: "What is the capital of France?", options: ['Berlin', 'Madrid', 'Paris'], answer: "Paris" },
    { id: 2, category: 'Science', question: 'What is the chemical symbol for water?', options: ['H2O', 'O2', 'CO2'], answer: 'H2O' },
    { id: 3, category: 'Math', question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' }
];

// Routes
app.get('/api/questions', (req, res) => {
    const { category } = req.query;

    let filteredQuestions = questions;
    if (category) {
        filteredQuestions = questions.filter(q => q.category === category);
    }
    res.json(filteredQuestions);
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

app.get('/manageUsers', (req, res) => {
    res.sendFile('manageUsers.html', {
        root: path.join(__dirname, 'views')
    });
});

const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const quizRoutes = require('./routes/quizRoutes');

app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/quizzes', authMiddleware, quizRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App!');
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
