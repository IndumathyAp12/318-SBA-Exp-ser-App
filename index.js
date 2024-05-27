const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Example route to demonstrate JSON response
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Route to handle POST requests
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ receivedData: data });
});

// Route with URL parameters
app.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json({ userId: userId });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
