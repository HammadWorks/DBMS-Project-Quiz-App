const { Router } = require("express");
const quiz = require("../models/quizzes");

const {
  handleCreateNewQuiz,
  handleGetQuizByIdAndshowQuestions,
  handleAddQuestionsInTheQuiz,
  handleGetAllQuizzesAndDisplay,
  handleDeleteQuizById,
  handleDeleteQuestionById,
} = require("../controllers/quiz");

const router = Router();

router.get("/", handleGetAllQuizzesAndDisplay);

router.get("/create-quiz", (req, res) => {
  return res.render("create-quiz");
});

router.post("/create-quiz", handleCreateNewQuiz);

router.get("/:quiz_id", handleGetQuizByIdAndshowQuestions);

router.post("/edit/:quiz_id", handleAddQuestionsInTheQuiz);

router.get("/delete/:quiz_id",handleDeleteQuizById)

router.get("/delete/question/:quiz_id/:ques_id",handleDeleteQuestionById)

module.exports = router;
