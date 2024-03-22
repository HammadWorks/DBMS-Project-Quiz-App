const { Schema, model, default: mongoose } = require("mongoose");
const user = require("./user");

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    interactionHistory: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const quiz = model("quiz", quizSchema);

module.exports = quiz;
