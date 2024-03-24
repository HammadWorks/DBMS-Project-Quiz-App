const { Schema, model, default: mongoose } = require("mongoose");

const questionSchema = new Schema({
  QuizId: {
    type: Schema.Types.ObjectId,
    ref: "quiz",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: [
    {
      type: String,
      required: true,
    },
  ],
  correctChoice: {
    type: String,
    required: true,
  },
  points: {
    type: String,
  },
});

const Question = model("question", questionSchema);

module.exports = Question;
