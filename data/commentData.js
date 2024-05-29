let comments = [];

module.exports = {
  getAllComments: () => comments,
  getCommentsByQuizId: (quizId) => comments.filter(comment => comment.quizId === quizId),
  createComment: (quizId, userId, text) => {
    const newComment = {
      id: comments.length + 1,
      quizId,
      userId,
      text,
      createdAt: new Date().toISOString()
    };
    comments.push(newComment);
    return newComment;
  },
  deleteComment: (id) => {
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) return false;
    comments.splice(index, 1);
    return true;
  }
};
