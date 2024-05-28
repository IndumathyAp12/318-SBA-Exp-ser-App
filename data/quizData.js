const Quiz = require('../models/quiz');

let quizzes = [];

module.exports = {
  getAllQuizzes: () => quizzes,
  createQuiz: (userId, question, options, answer) => {
    const newQuiz = new Quiz(quizzes.length + 1, userId, question, options, answer);
    quizzes.push(newQuiz);
    return newQuiz;
  }

};
// Quiz questions
// const questions = [
//     { id: 1, question: "What is 2 + 2?", answer: "4" },
//     { id: 2, question: "What is the capital of France?", answer: "Paris" },

// ];

// module.exports = quiz;