import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Components
import { TrueOrFalse, Alternative, Written } from "../../components/AnswerType";
import { Default } from "../../components/QuestionActions";
// Styles
import "./index.css";
// Questions DB
import { questions as database } from "../../utils/questions";

/**
 * ViewQuestion
 * Display a question and its resolution area
 */
const ViewQuestion = ({ match }) => {  
  const [question, setQuestion] = useState({})

  // Level of the answer
  const [level, setLevel] = useState({
    easy: true,
    medium: false,
    hard: false,
  })

  useEffect(() => {
    /* 
      * Find the question and display it onscreen

      - Get the question id from the URL
      - Recover the question from the database by using the 'subject', then the 'id' of the question
        that is coming from the parameters in the URL
      - Once it gets the right question, store it in a state so that it is loaded onscreen
    */

    let subject = match.params.subject
    let idQuestion = match.params.idQuestion
    let question = database[`${subject}`].find(element => element.id === idQuestion)

    setQuestion(question)

  }, [match.params.subject, match.params.idQuestion])

  const handleLevelChange = e => {
    let lvlClicked = e.target.id

    // set everything to false, then set only the correct component to true
    let new_level = {
      easy: false,
      medium: false,
      hard: false,
    }

    new_level[lvlClicked] = true

    setLevel(new_level)
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
            {/* TODO add key for each mapped element */}
            {/* { question.tags.map(tag => <div className="badge-tags me-1">{tag}</div>) } */}
          </div>
        </div>

        {/* AREA: Resolution */}
        <div className="Resolution col-md-7">
          <div>
            <header>
              <h4>Resolva</h4>
              <div className="box-levels">
                <button id="easy" className="btn btn-secondary ms-1" onClick={handleLevelChange}>Fácil</button>
                <button id="medium" className="btn btn-secondary ms-1" onClick={handleLevelChange}>Médio</button>
                <button id="hard" className="btn btn-secondary ms-1" onClick={handleLevelChange}>Difícil</button>
                {/*<button type="button" className="btn btn-secondary ms-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107"
                    className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                  </svg>
                  Fácil
                </button>*/}
              </div>
            </header>
            
            {/* Body of the resolution area, where a single type of answer is displayed 

              Change the input type based on the level state ('facil', 'medio', 'dificil')
              When the state changes, another type of input is renderered on screen

              By default, it is the 'easy' state (aka TrueOrFalse input)
            */}
            
            { level.easy ? <TrueOrFalse /> : null }
            { level.medium ? <Alternative /> : null }
            { level.hard ? <Written /> : null }
          </div>

          {/* Component where the actions are --> answer the question/next question */}
          <Default />
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;