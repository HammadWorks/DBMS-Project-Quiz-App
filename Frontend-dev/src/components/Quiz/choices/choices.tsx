import React from "react";
import './style.css'

interface choicePropsInterface {
  value: string;
}

const Choice: React.FC<choicePropsInterface> = (props) => {
  return (
    <li className="choice">
      <input type="radio" name="answer" id={props.value} />
      <label htmlFor={props.value}>{props.value}</label>
    </li>
  );
};

export default Choice;
