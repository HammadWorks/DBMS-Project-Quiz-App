const { Router } = require("express");
const {
  handleCreateNewQuiz, handleGetQuizById,
} = require("../controllers/quiz");
const router = Router();

// Display all Quizzes created By the User
// router.get("/", async (req, res) => {
//   const resultQuiz = await quiz.find({createdBy: req.user._id});
//   return res.render("Create-Quiz", { resultQuiz });
// });

router.get("/create-quiz", (req, res) => {
  return res.render("create-quiz");
});

router.post("/create-quiz", handleCreateNewQuiz);

router.get("/:quiz_id", handleGetQuizById);

module.exports = router;
