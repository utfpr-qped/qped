import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Styles
import "./index.css";
// Components
// Code Editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";

import {
  getParsedQuestions,
  setParsedQuestions,
} from "../../utils/questions/helper";
import { stringifyQuestionsFile } from "../../utils/questions";

/**
 * EditQuestion
 * Display a question and its resolution area
 */
const EditQuestion = ({ match }) => {
  const [shouldLoadQuestion, setShouldLoadQuestion] = useState(true);

  const [questions] = useState(getParsedQuestions());
  const [question, setQuestion] = useState({});
  const [subject] = useState(match.params.subject);

  function saveQuestion(question) {
    const saveQuestions = questions;
    if (!Array.isArray(saveQuestions[subject])) {
      saveQuestions[subject] = [];
    }
    /*
    if (typeof question.answer === "string") {
      question.answer = parseFunction(question.answer)
    }
    */
    const editIndex = saveQuestions[subject].findIndex(
      (element) => element.id === question.id
    );
    if (editIndex >= 0) {
      saveQuestions[subject][editIndex] = question;
    } else {
      saveQuestions[subject].push(question);
    }
    setParsedQuestions(stringifyQuestionsFile(saveQuestions));
  }

  useEffect(() => {
    if (shouldLoadQuestion) {
      setShouldLoadQuestion(false);

      const idQuestion = match.params.idQuestion;

      const functionExample = "";

      const question =
        idQuestion === "new"
          ? {
              id: "",
              text: "",
              answer: functionExample,
              subject,
              level: null,
              keywords: [],
            }
          : questions[subject].find((e) => e.id === idQuestion);

      if (typeof question.answer !== "string") {
        question.answer = question.answer.toString();
      }

      setQuestion(question);
    }
  }, [subject, match.params.idQuestion, shouldLoadQuestion, questions]);

  function onChangeValue(value, property) {
    const changeQuestion = question;
    changeQuestion[property] = value;
    setQuestion(changeQuestion);
  }

  return (
    <div className="EditQuestion container">
      <div className="row justify-content-center p-4">
        <div className="col-lg-8">
          <div className="body">
            {/* Link that goes back to the topic list */}
            <div className="mb-3">
              <Link to="/manage-questions" className="fw-bolder subject">
                {"??? Voltar"}
              </Link>
            </div>

            {/* Title of the question */}
            <div className="mb-3">
              <h2 className="h2 mb-3">Editor</h2>
            </div>

            <div className="row g-4">
              <div className="col-12">
                <label htmlFor="inputId" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputId"
                  aria-describedby="idHelp"
                  defaultValue={question.id}
                  onChange={(e) => {
                    onChangeValue(e.target.value, "id");
                  }}
                />
                <div id="idHelp" className="form-text">
                  ?? atrav??s desse c??digo que o aluno vai encontrar a quest??o.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="inputText" className="form-label">
                  Enunciado
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="inputText"
                  aria-describedby="textHelp"
                  rows="5"
                  defaultValue={question.text}
                  onChange={(e) => {
                    onChangeValue(e.target.value, "text");
                  }}
                />
                <div id="textHelp" className="form-text">
                  Escreva o enunciado da quest??o em formato Markdown.
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="inputLevel" className="form-label">
                  N??vel de dificuldade
                </label>
                <select
                  id="inputLevel"
                  className="form-select"
                  aria-label="Selecionar dificuldade da quest??o"
                  aria-describedby="levelHelp"
                  defaultValue={question.level}
                  onChange={(e) => {
                    let valueAsInt = parseInt(e.target.value);
                    onChangeValue(valueAsInt, "level");
                  }}
                >
                  {/* TODO: default value is not showing correctly */}
                  <option defaultValue={question.level}>
                    {question.level === 1
                      ? "F??cil"
                      : question.level === 2
                      ? "M??dio"
                      : question.level === 3
                      ? "Dif??cil"
                      : "Selecione"}
                  </option>
                  <option value={1}>F??cil</option>
                  <option value={2}>M??dio</option>
                  <option value={3}>Dif??cil</option>
                </select>
                <div id="levelHelp" className="form-text">
                  N??vel de dificuldade da quest??o.
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="keywords" className="form-label">
                  Palavras-chave
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="keywords"
                  aria-describedby="keywordsHelp"
                  defaultValue={question.keywords}
                  onChange={(e) => {
                    const { value } = e.target;
                    const saveValue = value.split(" ").join("").split(",");
                    onChangeValue(saveValue, "keywords");
                  }}
                />
                <div id="keywordsHelp" className="form-text">
                  Tags relacionadas ?? quest??o.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="answer" className="form-label">
                  Fun????o de resposta
                </label>
                <AceEditor
                  mode="javascript"
                  theme="dracula"
                  onChange={(c) => {
                    onChangeValue(c, "answer");
                  }}
                  name="answer"
                  editorProps={{ $blockScrolling: true }}
                  value={question.answer}
                />
              </div>

              <div className="col">
                <Link
                  to="/manage-questions"
                  onClick={() => saveQuestion(question)}
                  className="btn btn-primary"
                >
                  Salvar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
