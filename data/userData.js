const User = require('../models/user');

let users = [
  { id: 1, name: 'Roxine', email: 'rswate0@wix.com' },
  { id: 2, name: 'Fax', email: 'fnewson1@elpais.com' },
  { id: 3, name: 'Ariel', email: 'aanthon2@yahoo.co.jp' },
  { id: 4, name: 'Cairistiona', email: 'ccordeau3@digg.com' },
  { id: 5, name: 'Kathe', email: 'kstark4@cdc.gov' }
];

module.exports = {
  getAllUsers: () => users,
  getUserById: (id) => users.find(user => user.id === id),
  createUser: (name, email) => {
    const newUser = new User(users.length + 1, name, email);
    users.push(newUser);
    return newUser;
  },
  updateUser: (id, name, email) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], name, email };
    return users[userIndex];
  },
  deleteUser: (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
};
