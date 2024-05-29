const validateUserMiddleware = (req, res, next) => {
    const { name, email } = req.body;
    if (typeof name === 'string' && typeof email === 'string' && email.includes('@')) {
        next();
    } else {
        res.status(400).send('Invalid data');
    }
};

module.exports = validateUserMiddleware;
