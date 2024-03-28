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

questionSchema.pre("save", function (next) {
  const thisQuiz = this;
  console.log(thisQuiz._id);
  if (!thisQuiz.choices.includes(thisQuiz.correctChoice))
    throw new Error("Correct Choice Not Matched?");
  next();
});

const Question = model("question", questionSchema);

module.exports = Question;
