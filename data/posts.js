const Quiz = require('../models/Quiz');

let quizzes = [];

module.exports = {
  getAllQuizzes: () => quizzes,
  createQuiz: (userId, question, options, answer) => {
    const newQuiz = new Quiz(quizzes.length + 1, userId, question, options, answer);
    quizzes.push(newQuiz);
    return newQuiz;
  }
  
};
