import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Components
import InputType from "../../components/InputType";
import QuestionActions from "../../components/QuestionActions";
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

  /**
   * * independentemente de qual InputType é carregado (trueorfalse, written, etc)
   * eu preciso recuperar um unico tipo de valor que o usuario inseriu
   *  - se foi TrueOrFalse, gerar duas respostas (uma true e outra false) usando o question.getAllValues(seeds), 
   *    mas sortear apenas 1 delas para exibir ao usuario, para q ele possa decidir se esta correta ou nao
   *  - se for MultpleChoise, fazer a mesma coisa que TrueOrfalse, mas gerando 5 alternativas, 1 sendo sempre correta
   *  - se foi Written, pegar o valor do input/textarea
   * 
   * * uma vez que o userInput for recuperado e armazenado em um state
   * é possivel usar o userInput, e.g. passar na hora de verificar se a resposta esta correta ou nao
   */

  /**
   * É ativado quando o usuario clica em "Responder"
   */
  const handleQuestionAnswered = () => {    
    setDidUserAnswer(true)
    
    const answerFunction = question.answer //funcao 'answer' daquela questao
    const values = question.values //valores apresentados no enunciado da questao
    const input = userInput //resposta do usuario
    
    /* chamar a funcao que retorna a resposta correta da questao
      i.e ela chama a funcao 'answer' daquela questao espefifica */
    const correctAnswer = eval(`(${answerFunction})(${JSON.stringify(values)})`)

    console.log('correct answer: ', correctAnswer)
    console.log('user answer: ', input)
    
    setIsAnswerCorrect(false)
  }

  const handleRedoQuestion = () => {
    // load a new question of that same type and level
    setShouldLoadQuestion(true)

    // load default component for QuestionActions
    setDidUserAnswer(false)
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
              <div className="d-flex">
                <div className="form-check ps-1">
                  <input 
                    type="radio" 
                    value="easy" 
                    className="btn-check" 
                    name="levelOptions" 
                    id="level-easy" 
                    checked={selectedLevel === 'easy'} 
                    onChange={e => {setSelectedLevel(e.target.value)}}
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
                    onChange={e => {setSelectedLevel(e.target.value)}} 
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
                    onChange={e => {setSelectedLevel(e.target.value)}} 
                  />
                  <label className="btn btn-outline-secondary" htmlFor="level-hard">Difícil</label>
                </div>
              </div>
            </header>

            {/* Body of the resolution area, where a single type of answer is displayed 

              Change the input type based on the level state ('facil', 'medio', 'dificil')
              When the state changes, another type of input is renderered on screen

              By default, it is the 'easy' state (aka TrueOrFalse input)
            */}

            <InputType type={selectedLevel} setUserInput={setUserInput} />
          </div>

          {/* Component where the actions are --> answer the question/next question */}
          <QuestionActions 
            didUserAnswer={didUserAnswer} 
            handleQuestionAnswered={handleQuestionAnswered} 
            isAnswerCorrect={isAnswerCorrect} 
            handleRedoQuestion={handleRedoQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;