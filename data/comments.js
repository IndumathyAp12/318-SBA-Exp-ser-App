const Comment = require('../models/Comment');

let comments = [];

module.exports = {
  getAllComments: () => comments,
  createComment: (quizId, userId, text) => {
    const newComment = new Comment(comments.length + 1, quizId, userId, text);
    comments.push(newComment);
    return newComment;
  }
  
};
