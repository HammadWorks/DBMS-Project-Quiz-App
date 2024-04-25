const { Router } = require("express");

const {
  handleCreateNewQuiz,
  handleGetQuizByIdAndshowQuestions,
  handleAddQuestionsInTheQuiz,
  handleGetAllQuizzesAndDisplay,
  handleDeleteQuizById,
  handleDeleteQuestionById,
  handlePlayQuizRequest,
  handlePostPlayQuizByQuestionId,
  handleGenerateQuizs,
  handlePostLeaderBoard,
  handleGetLeaderBoardData,
} = require("../controllers/quiz");

const router = Router();

router.get("/", handleGetAllQuizzesAndDisplay);

router.get("/generate", (req, res) => {
  return res.render("generateForm");
});

router.post("/generate", handleGenerateQuizs);

router.get("/create-quiz", (req, res) => {
  return res.render("createForm");
});

router.post("/create-quiz", handleCreateNewQuiz);

router.get("/:quiz_id", handleGetQuizByIdAndshowQuestions);

router.post("/edit/:quiz_id", handleAddQuestionsInTheQuiz); // Pending...

router.get("/delete/:quiz_id", handleDeleteQuizById);

router.get("/delete/question/:quiz_id/:ques_id", handleDeleteQuestionById);

router.get("/play/:quiz_id", handlePlayQuizRequest);

router.post("/play/:quiz_id", handlePostPlayQuizByQuestionId);

router.get("/play/leaderboard/:quiz_id", handleGetLeaderBoardData);

router.post("/play/leaderboard/:quiz_id",handlePostLeaderBoard);

module.exports = router;
