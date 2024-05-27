const User = require('../models/User');

let users = [];

module.exports = {
  getAllUsers: () => users,
  createUser: (name, email) => {
    const newUser = new User(users.length + 1, name, email);
    users.push(newUser);
    return newUser;
  }
  
};
