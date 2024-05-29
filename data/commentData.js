const comments = [];

module.exports = {
  getAllComments: () => comments,
  createComment: (quizId, userId, text) => {
    const newComment = { id: comments.length + 1, quizId, userId, text };
    comments.push(newComment);
    return newComment;
  }
};
