const quizzes = [];

module.exports = {
  getAllQuizzes: () => quizzes,
  createQuiz: (userId, question, options, answer) => {
    const newQuiz = { id: quizzes.length + 1, userId, question, options, answer };
    quizzes.push(newQuiz);
    return newQuiz;
  }
};
