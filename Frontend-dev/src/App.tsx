import React, { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import axios from "axios";

interface quizType {
  _id: number;
  QuizId: number;
  question: string;
  choices: string[];
  correctChoice: string;
  points: number;
  __v: number;
}

const App: React.FC = () => {
  const [index, setIndex] = useState(0);
  // const [input, setInput] = useState<string>("");
  const [quiz, setQuiz] = useState<quizType[]>();

  // useEffect(() => {
  //   axios
  //     .get<quizType[]>(`/generate/${input}`)
  //     .then((response) => setQuiz(response.data))
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // });

  function handleGenerate() {
    const gen = prompt("Enter Prompt:");
    axios
      .get<quizType[]>(`/generate/${gen}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => {
        console.log("error", error);
      });
  }

  function handleOnclickNext() {
    if (quiz && index == quiz.length - 1)
      return alert("You have Completed All the Questions!");
    console.log("index", index);
    setIndex(index + 1);
  }
  const handleOnclickPrevious = () => {
    if (index == 0) return;
    setIndex(index - 1);
  };

  return (
    <>
      <h1>Hello From React</h1>
      <button onClick={handleGenerate}>Generate</button>
      {quiz && (
        <h1>
          {index + 1}/{quiz.length}
        </h1>
      )}
      {quiz && <Quiz quiz={quiz[index]} />}
      <button style={{ background: "tomato" }} onClick={handleOnclickPrevious}>
        Previous
      </button>
      <button style={{ background: "lightgreen" }} onClick={handleOnclickNext}>
        Next
      </button>
    </>
  );
};

export default App;
