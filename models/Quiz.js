class Quiz {
    constructor(id, userId, question, options, answer) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

module.exports = Quiz;
