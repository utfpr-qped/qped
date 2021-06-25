import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Components
import InputType from "../../components/InputType";
import { Default, Answered } from "../../components/QuestionActions";
// Styles
import "./index.css";
// Questions DB
import { rawQuestions, parseQuestion } from "../../utils/index";

/**
 * ViewQuestion
 * Display a question and its resolution area
 */
const ViewQuestion = ({ match }) => {
  const [shouldLoadQuestion, setShouldLoadQuestion] = useState(true)

  const [question, setQuestion] = useState({})

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [didUserAnswer, setDidUserAnswer] = useState(false)

  const [userInput, setUserInput] = useState('')

  // Level of the answer
  const [selectedLevel, setSelectedLevel] = useState('easy')

  useEffect(() => {
    /* 
      * Find the question and display it onscreen

      - Get the question id from the URL
      - Recover the question from the database by using the 'subject', then the 'id' of the question
        that is coming from the parameters in the URL
      - Once it gets the right question, store it in a state so that it is loaded onscreen
    */

    if (shouldLoadQuestion) {
      setShouldLoadQuestion(false)

      let subject = match.params.subject
      let idQuestion = match.params.idQuestion
      let question = parseQuestion(rawQuestions[`${subject}`].find(element => element.id === idQuestion))

      setQuestion(question)
    }

  }, [match.params.subject, match.params.idQuestion, shouldLoadQuestion])

  // Activates when user tries to answer the question
  const handleQuestionAnswered = () => {
    setDidUserAnswer(true)

    // get the correct answer for that question
    // eslint-disable-next-line
    const correctAnswer = eval(`(${question.answer})(${JSON.stringify(question.values)})`)

    // check whether the answer that the user entered is correct or not
    userInput.toString() === correctAnswer.toString() ? setIsAnswerCorrect(true) : setIsAnswerCorrect(false)

    setCorrectAnswer(correctAnswer)
  }

  const handleRedoQuestion = () => {
    // load a new question of that same type and level
    setShouldLoadQuestion(true)

    // load default component for QuestionActions
    setDidUserAnswer(false)
  }

  const handleNextQuestion = () => {

    const nextLevel = findNextlevel(selectedLevel)

    // change question to next level
    setSelectedLevel(nextLevel)

    // load a new question of that same type and level
    setShouldLoadQuestion(true)

    // load default component for QuestionActions
    setDidUserAnswer(false)
  }

  const findNextlevel = (selectedLevel) => {
    let nextLevel = null
    if (selectedLevel === "easy") {
      nextLevel = "medium"
    } else if (selectedLevel === "medium") {
      nextLevel = "hard"
    } else { // TODO: update with next question or message
      nextLevel = "easy"
    }
    return nextLevel
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-md-5">
          <div className="body">
            {/* Link that goes back to the topic list */}
            <div className="mb-3">
              <Link to="/topics" className="h6 subject">{`← ${question.subject}`}</Link>
            </div>

            {/* Title of the question */}
            <div className="mb-3">
              <h2 className="h2 mb-3">{question.title}</h2>
            </div>

            {/* Question text in markdown */}
            <ReactMarkdown children={question.text} />
          </div>

          <div className="tags mb-6">
            {/* Iterate the tags array for that question and display it onscreen  */}
            {question.tags && (
              Object.keys(question.tags).map((tagObj, index) => {
                return <div className="badge-tags me-1" key={index}>{question.tags[index]}</div>
              })
            )}
          </div>
        </div>

        {/* AREA: Resolution */}
        <div className="Resolution col-md-7">
          <div>
            <header>
              <h4>Resolva</h4>
              <div className="d-flex">
                <div className="form-check ps-1">
                  <input
                    type="radio"
                    value="easy"
                    className="btn-check"
                    name="levelOptions"
                    id="level-easy"
                    checked={selectedLevel === 'easy'}
                    onChange={e => { setSelectedLevel(e.target.value) }}
                  />
                  <label className="btn btn-outline-secondary" htmlFor="level-easy">Fácil</label>
                </div>
                <div className="form-check ps-1">
                  <input
                    type="radio"
                    value="medium"
                    className="btn-check"
                    name="levelOptions"
                    id="level-medium"
                    checked={selectedLevel === 'medium'}
                    onChange={e => { setSelectedLevel(e.target.value) }}
                  />
                  <label className="btn btn-outline-secondary" htmlFor="level-medium">Médio</label>
                </div>
                <div className="form-check ps-1">
                  <input
                    type="radio"
                    value="hard"
                    className="btn-check"
                    name="levelOptions"
                    id="level-hard"
                    checked={selectedLevel === 'hard'}
                    onChange={e => { setSelectedLevel(e.target.value) }}
                  />
                  <label className="btn btn-outline-secondary" htmlFor="level-hard">Difícil</label>
                </div>
              </div>
            </header>

            {
              /**
               * Render one input type based on the level ('facil', 'medio', 'dificil')
               * When the state changes, another type of input is renderered on screen
               * By default, it is the 'easy' state (i.e. TrueOrFalse input)
               */
              question && question.options && question.trueOrFalseOptions ? (
                <InputType
                  type={selectedLevel}
                  trueOrFalseOptions={question.trueOrFalseOptions}
                  multipleChoiceOptions={question.options}
                  setUserInput={setUserInput}
                />
              ) : null
            }
          </div>

          {didUserAnswer ? (
            <Answered
              isAnswerCorrect={isAnswerCorrect}
              correctAnswer={correctAnswer}
              handleRedoQuestion={handleRedoQuestion}
              handleNextQuestion={handleNextQuestion}
            />
          ) : (
            <Default handleQuestionAnswered={handleQuestionAnswered} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;