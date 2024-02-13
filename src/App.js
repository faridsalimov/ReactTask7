import React, { useState, useEffect } from "react";
import questions from "./data";
import "./App.css";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(""));
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, []);

  const checkAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.options[currentQuestion.correctAnswerIndex]) {
      setScore(score + 10);
    }
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const finishQuiz = () => {
    const answeredAllQuestions = userAnswers.every(answer => answer !== "");
    if (!answeredAllQuestions) {
      alert("Please answer all questions.");
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="container">
      {!showScore && (
        <div>
          <div className="question-container">
            <h2>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</h2>
            <ul className="options-list">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} onClick={() => checkAnswer(option)} className={userAnswers[currentQuestionIndex] === option ? "option-selected" : ""}>
                  {String.fromCharCode(65 + index)}) {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="navigation-buttons">
            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
            <button onClick={finishQuiz}>Finish</button>
          </div>
        </div>
      )}
      {showScore && (
        <div className="score-content">
          <h1>Congratulations!</h1>
          <h2>Score: {score}</h2>
        </div>
      )}
    </div>
  );
};

export default App;