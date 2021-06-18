import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Components
import { TrueOrFalse } from "../../components/AnswerType";
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

  const [markdown, setMarkdown] = useState()

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

    // * Store question text in markdown state

  }, [match.params.subject, match.params.idQuestion])

  return (
    <div className="container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-md-5">
          <div className="body">
            <div className="mb-3">
              <Link to="/topics" className="h6 subject">{`← ${question.subject}`}</Link>
            </div>
            <h2 className="h2 mb-3">{question.title}</h2>
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
                <button className="btn btn-secondary ms-1">Fácil</button>
                <button className="btn btn-outline-secondary ms-1">Médio</button>
                <button className="btn btn-outline-secondary ms-1">Avançado</button>
                <button type="button" className="btn btn-secondary ms-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107"
                    className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                  </svg>
                  Fácil
                </button>
              </div>
            </header>
            
            {/* Body of the resolution area, where a single type of answer is displayed */}
            <TrueOrFalse />
          </div>

          {/* Component where the actions are --> answer the question/next question */}
          <Default />
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;