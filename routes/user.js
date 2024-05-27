const express = require('express');
const router = express.Router();
const userData = require('../data/userData');

router.get('/', (req, res) => {
  const users = userData.getAllUsers();
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = userData.createUser(name, email);
  res.status(201).json(newUser);
});

module.exports = router;
