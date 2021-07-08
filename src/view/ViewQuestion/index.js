import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// Components
import InputType from "../../components/InputType";
import { Default, Answered } from "../../components/QuestionActions";
// Styles
import "./index.css";
// Questions DB
import { rawQuestions, parseQuestion } from "../../utils/index";
// Assets
import { LightningChargeFill } from "../../assets/Icons";

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
  const [showLevel, setShowLevel] = useState(false)

  // Store the initial time the user started to solve the question
  const [timer, setTimer] = useState({ startedAt: null })

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

      setUserInput('')// clear user input

      let subject = match.params.subject
      let idQuestion = match.params.idQuestion
      let question = parseQuestion(rawQuestions[`${subject}`].find(element => element.id === idQuestion))

      setQuestion(question)

      // once the question is loaded onscreen, set the current time in seconds to the timer
      setTimer({ startedAt: Math.floor(new Date() / 1000) })
    }

  }, [match.params.subject, match.params.idQuestion, shouldLoadQuestion])

  // Update localStorage with the new event
  const updateStorage = (event) => {
    /* 
     Check if localstorage already has history
     - if it does, copy the existing content to a new array, push a new event and then set the new array at the localstorage
     - if it does not, create a new array, add the new event and then set it to the localstorage
    */

    let history = JSON.parse(localStorage.getItem('history'))
    let new_history = history ? [...history, event] : [event]
    localStorage.setItem('history', JSON.stringify(new_history))
  }
  
  // Activates when user tries to answer the question
  const handleQuestionAnswered = () => {
    // get the current time, then subtract it by the time the user started to solve the question
    // then return the total time in seconds, which is also the time spent in total
    let secondsInTotal = (Math.floor(new Date() / 1000)) - (timer.startedAt)
    
    setDidUserAnswer(true)

    // get the correct answer for that question
    // eslint-disable-next-line
    const correctAnswer = eval(`(${question.answer})(${JSON.stringify(question.values)},${JSON.stringify(question.blocks)})`)

    // check if user input is of type 'object', so it can be compared to the correct answer (which is of type 'object')
    let formattedUserInput = userInput
    if (typeof (userInput) !== 'object') {
      // if user separates the answer with a comma, then it is ready for JSON.parse()
      // if not, then it is implied that it is devided by white spaces, therefore, replace each white space for a comma
      if (!userInput.includes(",")) formattedUserInput = formattedUserInput.replace(/\s/g, ',')

      // format user input to look like an object
      formattedUserInput = JSON.parse('[' + formattedUserInput + ']')
    }

    // check whether the answer that the user entered is correct or not
    const isAnswerCorrect = formattedUserInput.toString() === correctAnswer.toString()

    // create an event after the question has been answered
    // TODO: get the username dinamically
    const event = {
      username: 'Nome do Aluno',
      questionId: question.id,
      inputLevel: selectedLevel,
      userAnswer: formattedUserInput.toString(),
      isAnswerCorrect: isAnswerCorrect,
      date: new Date(),
      timeSpent: secondsInTotal
    }
    
    // save event to localStorage
    updateStorage(event)

    setIsAnswerCorrect(isAnswerCorrect)
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
    <div className="ViewQuestion container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-lg-6">
          <div className="body">
            {/* Link that goes back to the topic list */}
            <div className="mb-3">
              <Link to="/topics" className="fw-bolder subject">{`← ${question.subject}`}</Link>
            </div>

            {/* Title of the question */}
            <div className="mb-3">
              <h2 className="h2 mb-3">{question.title}</h2>
            </div>

            {/* Question text in markdown */}
            <ReactMarkdown
              components={{
                code({ className, children }) {
                  // Removing "language-" because React-Markdown already added "language-"
                  // const language = className.replace("language-", "");
                  return (
                    <SyntaxHighlighter
                      style={materialDark}
                      language={'c'}
                      children={children[0]}
                    />
                  );
                },
              }}
            >
              {question.text}
            </ReactMarkdown>
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
        <div className="Resolution col-lg-6">
          <div>
            <header>
              <h4 className="mb-0">Resolva</h4>
              <div className="d-flex">
                {
                  showLevel && (
                    <div className="d-flex">
                      <div className="form-check ps-1 mb-0">
                        <input
                          type="radio"
                          value="easy"
                          className="btn-check"
                          name="levelOptions"
                          id="level-easy"
                          checked={selectedLevel === 'easy'}
                          onChange={e => { setSelectedLevel(e.target.value); setShowLevel(!showLevel) }}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="level-easy">Fácil</label>
                      </div>
                      <div className="form-check ps-1 mb-0">
                        <input
                          type="radio"
                          value="medium"
                          className="btn-check"
                          name="levelOptions"
                          id="level-medium"
                          checked={selectedLevel === 'medium'}
                          onChange={e => { setSelectedLevel(e.target.value); setShowLevel(!showLevel) }}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="level-medium">Médio</label>
                      </div>
                      <div className="form-check ps-1 mb-0">
                        <input
                          type="radio"
                          value="hard"
                          className="btn-check"
                          name="levelOptions"
                          id="level-hard"
                          checked={selectedLevel === 'hard'}
                          onChange={e => { setSelectedLevel(e.target.value); setShowLevel(!showLevel) }}
                        />
                        <label className="btn btn-outline-secondary" htmlFor="level-hard">Difícil</label>
                      </div>
                    </div>
                  )
                }

                <div className="ps-1">
                  <div className="btn btn-secondary" onClick={() => { setShowLevel(!showLevel) }}>
                    <span className="text-warning pe-1"><LightningChargeFill /></span>

                    {selectedLevel === 'easy' && 'Fácil'}
                    {selectedLevel === 'medium' && 'Médio'}
                    {selectedLevel === 'hard' && 'Difícil'}
                  </div>
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
            <Default
              handleQuestionAnswered={handleQuestionAnswered}
              isAnswerable={userInput ? true : false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;