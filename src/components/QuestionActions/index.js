import "./index.css";

export const Default = ({ handleQuestionAnswered }) => {
  return (
    <div className="container-actions default">
      {/* Text and Answer */}
      {/* <...> */}

      {/* Buttons */}
      <button className="btn btn-primary" onClick={() => { handleQuestionAnswered() }}>Responder</button>
    </div>
  )
}

export const Answered = ({ isAnswerCorrect, correctAnswer, handleRedoQuestion, handleNextQuestion }) => {
  return (
    <div className="container-actions solved">
      {/* <!-- Text and Answer --> */}
      <div className="answer">
        <p data-answer-state={isAnswerCorrect}>{isAnswerCorrect ? 'Resposta correta!' : 'Resposta incorreta.'}</p>
        <div>{correctAnswer}</div>
      </div>

      {/* <!-- Buttons --> */}
      <div>
        <button type="button" className="btn btn-outline-light" onClick={() => { handleRedoQuestion() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
          </svg>
          Refazer
        </button>
        <button type="button" className="btn btn-dark" onClick={() => { handleNextQuestion() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
          </svg>
          Próximo Exercício
        </button>
      </div>
    </div>
  )
}
