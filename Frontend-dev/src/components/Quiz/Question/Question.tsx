import React from "react";
import './style.css'

interface questionPropInterface {
  question: string;
}

const Question: React.FC<questionPropInterface> = ({ question }) => {
  return (
    <li className="question-title">
      {question}
    </li>
  );
};

export default Question;
