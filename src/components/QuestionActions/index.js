import "./index.css";
// Assets
import { LightningChargeFill, ArrowRepeat } from "../../assets/Icons";

export const Default = ({ handleQuestionAnswered, isAnswerable }) => {
  return (
    <div className="container-actions default">
      {/* Text and Answer */}
      {/* <...> */}

      {/* Buttons */}
      <button 
        className="btn btn-primary" 
        onClick={() => { handleQuestionAnswered() }}
        disabled={!isAnswerable}
      >
        Responder
      </button>
    </div>
  )
}

export const Answered = ({ isAnswerCorrect, correctAnswer, handleRedoQuestion, handleNextQuestion }) => {
  return (
    <div className="container-actions solved">
      {/* <!-- Text and Answer --> */}
      <div className="answer">
        <p data-answer-state={isAnswerCorrect}>
          {isAnswerCorrect ? '✅ Resposta correta!' : '❌ A resposta correta é:'}
        </p>
        <div>{correctAnswer.join(', ')}</div>
      </div>

      {/* <!-- Buttons --> */}
      <div>
        <button type="button" className="btn btn-outline-light" onClick={() => { handleRedoQuestion() }}>
          <span className="pe-1"><ArrowRepeat /></span>
          Refazer
        </button>
        <button type="button" className="btn btn-dark" onClick={() => { handleNextQuestion() }}>
          <span className="pe-1 text-warning"><LightningChargeFill /></span>
          Próximo Exercício
        </button>
      </div>
    </div>
  )
}
