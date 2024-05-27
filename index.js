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

app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

