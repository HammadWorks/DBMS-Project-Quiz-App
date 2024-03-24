const { Router } = require("express");
const quiz = require("../models/quizzes");

const {
  handleCreateNewQuiz,
  handleGetQuizByIdAndshowQuestions,
  handleAddQuestionsInTheQuiz,
  handleGetAllQuizzesAndDisplay,
} = require("../controllers/quiz");

const router = Router();

router.get("/", handleGetAllQuizzesAndDisplay);

router.get("/create-quiz", (req, res) => {
  return res.render("create-quiz");
});

router.post("/create-quiz", handleCreateNewQuiz);

router.get("/:quiz_id", handleGetQuizByIdAndshowQuestions);

router.post("/edit/:quiz_id", handleAddQuestionsInTheQuiz);

module.exports = router;
