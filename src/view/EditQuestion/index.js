import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import ReactMarkdown from "react-markdown";
//import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// Components
//import InputType from "../../components/InputType";
//import { Default, Answered } from "../../components/QuestionActions";
// Styles
import "./index.css";
// Questions DB
//import { parseQuestionsString } from "../../questions/index";
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
  const [code, setCode] = useState("")
  const [subject] = useState(match.params.subject)


  function saveQuestion(question) {
    const saveQuestions = questions
    if (!Array.isArray(saveQuestions[subject])) {
      saveQuestions[subject] = []
    }
    saveQuestions[subject].push(question)
    console.log(saveQuestions)
    setParsedQuestions(stringifyQuestionsFile(saveQuestions))
  }

  useEffect(() => {
    if (shouldLoadQuestion) {
      setShouldLoadQuestion(false)

      let idQuestion = match.params.idQuestion

      const functionExample = `function (values, blocks) {
  const { a, b } = values
  return a + b
}`

      const question = idQuestion === "new"
        ? { id: "", text: "", answer: functionExample, subject, level: null, keywords: [] }
        : questions[`${subject}`].find(element => {
          if(element.id === idQuestion) {
            element.answer = element.answer.toString()
            return element
          }
        }
        )

      setCode(question.answer)
      setQuestion(question)
    }

  }, [subject, match.params.idQuestion, shouldLoadQuestion, questions])

  function onCodeChange(newCode) {
    setCode(newCode)
  }


  return (
    <div className="EditQuestion container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-lg-6">
          <div className="body">
            {/* Link that goes back to the topic list */}
            <div className="mb-3">
              <Link to="/manage-questions" className="fw-bolder subject">{`← ${question.subject}`}</Link>
            </div>
          </div>
          <div className="form">
            <form>
              <label>
                Id:
                <input type="text" name="id" placeholder={`${question.subject}-1`} value={question.id} />
              </label><br />
              <label>
                Text:
                <textarea
                  placeholder="Quantas trocas são necessárias para que a sequência abaixo seja ordenada de modo crescente?"
                  defaultValue={question.text}
                >
                </textarea>
              </label><br />
              <label>
                Level:
                <select id="level" value={question.level}>
                  <option value={1}>facil</option>
                  <option value={2}>medio</option>
                  <option value={3}>dificil</option>
                </select>
              </label><br />
              <label>
                Keywords:
                <input type="text" name="title" placeholder="tag1, tag2, tag3" value={question.keywords} />
              </label><br />
            </form>
          </div>
        </div>
      </div>
      <AceEditor
        mode="javascript"
        theme="dracula"
        onChange={onCodeChange}
        name="answer"
        editorProps={{ $blockScrolling: true }}
        value={code}
      />
      <button onClick={() => saveQuestion(question)}>save</button>
    </div >
  )
}

export default EditQuestion;