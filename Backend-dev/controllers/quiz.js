const Question = require("../models/question");
const quiz = require("../models/quizzes");

async function handleGetAllQuizzesAndDisplay(req, res) {
  const quizzes = await quiz.find({}).populate("createdBy");
  return res.render("show-quiz", { quizzes });
}

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
  return res.redirect(`/quiz/${result._id}`);
}

async function handleGetQuizByIdAndshowQuestions(req, res) {
  const quizId = req.params.quiz_id;
  try {
    const resultQuiz = await quiz
      .findById({ _id: quizId })
      .populate("questionsById.questionId");

    const checkCreator = () => {
      if (req.user._id == resultQuiz.createdBy._id) return true;
      return false;
    };
    isCreator = checkCreator();

    // Need to add a check point so that only the interaction history remains unique
    // await quiz.findOneAndUpdate(
    //   { _id: req.params.quiz_id },
    //   {
    //     $push: {
    //       interactionHistory: { userId: req.user._id, timestamps: Date.now() },
    //     },
    //   }
    // );

    return res.render("Create-Quiz", {
      resultQuiz,
      quizId,
      questions: resultQuiz.questionsById,
      isCreator,
    });
  } catch (error) {
    console.log("handleGetQuizById Error: ", error);

    return res.status(404).send("Not Found!");
  }
}

async function handleAddQuestionsInTheQuiz(req, res) {
  const quest = req.body;
  const choices = [quest.choice1, quest.choice2, quest.choice3, quest.choice4];
  if (!choices.includes(quest.correctChoice)) {
    return res.redirect(`/quiz/${req.params.quiz_id}`);
  }
  const resultQues = await Question.create({
    QuizId: req.params.quiz_id,
    question: quest.question,
    choices: choices,
    correctChoice: quest.correctChoice,
    points: quest.points,
  });

  await quiz.findOneAndUpdate(
    { _id: req.params.quiz_id },
    {
      $push: {
        questionsById: { questionId: resultQues._id },
      },
    }
  );

  return res.redirect(`/quiz/${req.params.quiz_id}`);
}

async function handleDeleteQuizById(req, res) {
  const quizId = req.params.quiz_id;
  try {
    await quiz.findByIdAndDelete({ _id: quizId });
    await Question.deleteMany({ QuizId: quizId });
    return res.redirect(`/quiz`);
  } catch (error) {
    return res.send("Failed to Delete!");
  }
}

async function handleDeleteQuestionById(req, res) {
  const quizId = req.params.quiz_id;
  const quesId = req.params.ques_id;

  try {
    await quiz.updateOne(
      { _id: quizId },
      {
        $pull: {
          questionsById: { questionId: quesId },
        },
      }
    );
    await Question.findOneAndDelete({ _id: quesId });
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/quiz/${quizId}`);
}

async function handlePlayQuizRequest(req, res) {
  // if (localStorage.length != 0) {
  //   const score = localStorage.getItem("UserScore");
  //   const QuizId = localStorage.getItem("QuizId");
  //   console.log(score, QuizId);
  //   localStorage.clear();
  // }

  res.render("play-quiz", { quizId: req.params.quiz_id });
}

async function handlePostPlayQuizByQuestionId(req, res) {
  const playQues = await Question.find({ QuizId: req.params.quiz_id });
  return res.json(playQues);
}

module.exports = {
  handleGetAllQuizzesAndDisplay,
  handleCreateNewQuiz,
  handleGetQuizByIdAndshowQuestions,
  handleAddQuestionsInTheQuiz,
  handleDeleteQuizById,
  handleDeleteQuestionById,
  handlePlayQuizRequest,
  handlePostPlayQuizByQuestionId,
};
