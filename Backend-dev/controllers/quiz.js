const quiz = require("../models/quizzes");

async function handleCreateNewQuiz(req, res) {
  const body = req.body;
  if (!body) {
    return res.send("Fields Required!");
  }
  const result = await quiz.create({
    title: body.title,
    description: body.description,
    createdBy: req.user._id,
    interactionHistory: [],
  });
  return res.send("Created");
}

async function handleGetQuizById(req, res) {
  try {
    const resultQuiz = await quiz.findById({ _id: req.params.quiz_id });
    return res.render("Create-Quiz", { resultQuiz });
  } catch (error) {
    return res.status(404).send("Not Found!");
  }
}

module.exports = {
  handleCreateNewQuiz,
  handleGetQuizById,
};
