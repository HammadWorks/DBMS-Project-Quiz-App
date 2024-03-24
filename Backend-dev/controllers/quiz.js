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
  return res.send("Created");
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

  const resultQues = await Question.create({
    question: quest.question,
    choices: [quest.choice1, quest.choice2, quest.choice3, quest.choice4],
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

module.exports = {
  handleGetAllQuizzesAndDisplay,
  handleCreateNewQuiz,
  handleGetQuizByIdAndshowQuestions,
  handleAddQuestionsInTheQuiz,
};
