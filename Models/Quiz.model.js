const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    creator: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
      {
        title: { type: String, required: true },
        answerOptions: [{ type: String, required: true }],
        correctOptions: [{ type: Number, required: true }]
      }
    ]
  })

const Quiz = mongoose.model("Quizzes", quizSchema)

module.exports = {
    Quiz
}