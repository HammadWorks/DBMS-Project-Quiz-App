const { model, Schema } = require("mongoose");

const leaderboardSchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: "quiz", required: true },
    participants: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        userName: String,
        score: Number,
      },
    ],
    totalScore: { type: Number },
  },
  { timestamps: true }
);

const leaderboard = model("leaderboard", leaderboardSchema);

module.exports = leaderboard;
