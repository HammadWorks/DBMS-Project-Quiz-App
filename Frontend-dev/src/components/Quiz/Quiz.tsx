import React from "react";
import Question from "./Question/Question";
import Choice from "./choices/choices";
import './style.css'

interface quizPropInterface {
  quiz: {
    question: string;
    choices: string[];
  };
}

const Quiz: React.FC<quizPropInterface> = ({ quiz }) => {
  return (
    <ul className="quiz">
      <Question question={quiz.question} />
      <Choice value={quiz.choices[0]} />
      <Choice value={quiz.choices[1]} />
      <Choice value={quiz.choices[2]} />
      <Choice value={quiz.choices[3]} />
    </ul>
  );
};

export default Quiz;
