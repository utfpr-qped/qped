import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import ReactMarkdown from "react-markdown";
//import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// Components
// Styles
import "./index.css";
// Code Editor
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-dracula"

import { getParsedQuestions, setParsedQuestions } from "../../utils/questions/helper";
import { stringifyQuestionsFile } from "../../utils/questions";

/**
 * EditQuestion
 * Display a question and its resolution area
 */
const EditQuestion = ({ match }) => {

  const [shouldLoadQuestion, setShouldLoadQuestion] = useState(true)

  const [questions] = useState(getParsedQuestions())
  const [question, setQuestion] = useState({})
  const [subject] = useState(match.params.subject)

  function saveQuestion(question) {
    const saveQuestions = questions
    if (!Array.isArray(saveQuestions[subject])) {
      saveQuestions[subject] = []
    }
    /*
    if (typeof question.answer === "string") {
      question.answer = parseFunction(question.answer)
    }
    */
    const editIndex = saveQuestions[subject].findIndex((element) => element.id === question.id)
    if (editIndex >= 0) {
      saveQuestions[subject][editIndex] = question
    } else {
      saveQuestions[subject].push(question)
    }
    setParsedQuestions(stringifyQuestionsFile(saveQuestions))
  }

  useEffect(() => {
    if (shouldLoadQuestion) {
      setShouldLoadQuestion(false)

      const idQuestion = match.params.idQuestion

      const functionExample = `function (values, blocks) {
  const { a, b } = values
  return a + b
}`

      const question = idQuestion === "new"
        ? { id: "", text: "", answer: functionExample, subject, level: null, keywords: [] }
        : questions[subject].find(e => e.id === idQuestion)

      if (typeof question.answer !== "string") {
        question.answer = question.answer.toString()
      }

      setQuestion(question)
    }

  }, [subject, match.params.idQuestion, shouldLoadQuestion, questions])

  function onChangeValue(value, property) {
    const changeQuestion = question
    changeQuestion[property] = value
    setQuestion(changeQuestion)
  }

  return (
    <div className="EditQuestion container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-lg-6">
          <div className="body">
            {/* Link that goes back to the topic list */}
            <div className="mb-3">
              <Link to="/manage-questions" className="fw-bolder subject">{"← Manage Questions"}</Link>
            </div>
          </div>
          <div className="form">
            <form>
              <label>
                Id:
                <input type="text" name="id" placeholder={`${question.subject}-1`} defaultValue={question.id} onChange={(e) => { onChangeValue(e.target.value, "id") }} />
              </label><br />
              <label>
                Text:
                <textarea
                  placeholder="Quantas trocas são necessárias para que a sequência abaixo seja ordenada de modo crescente?"
                  defaultValue={question.text}
                  onChange={(e) => { onChangeValue(e.target.value, "text") }}
                >
                </textarea>
              </label><br />
              <label>
                Level:
                <select id="level" defaultValue={question.level} onChange={(e) => { onChangeValue(e.target.value, "level") }}>
                  <option value={1}>facil</option>
                  <option value={2}>medio</option>
                  <option value={3}>dificil</option>
                </select>
              </label><br />
              <label>
                Keywords:
                <input type="text" name="title" placeholder="tag1, tag2, tag3" defaultValue={question.keywords} onChange={(e) => {
                  const { value } = e.target
                  const saveValue = value.split(" ").join("").split(",")
                  onChangeValue(saveValue, "keywords")
                }} />
              </label><br />
            </form>
          </div>
        </div>
      </div>
      <AceEditor
        mode="javascript"
        theme="dracula"
        onChange={(c) => {
          onChangeValue(c, "answer")
        }}
        name="answer"
        editorProps={{ $blockScrolling: true }}
        value={question.answer}
      />
      <Link to="/manage-questions" onClick={() => saveQuestion(question)}>save</Link>
    </div >
  )
}

export default EditQuestion;