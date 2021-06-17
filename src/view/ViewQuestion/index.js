import { Link } from "react-router-dom";
import { TrueOrFalse, Alternative, Written } from "../../components/AnswerType";
import "./index.css";

/**
 * ViewQuestion
 * Display a question and its resolution area
 */
const ViewQuestion = ({ question }) => {

  return (
    <div className="container-fluid">
      <div className="row">
        {/* AREA: Instruction */}
        <div className="Instruction col-md-5">
          <div className="body">
            <div className="mb-3">
              <Link to="/topics" className="h6 text-decoration-none">{`← ${question.subject}`}</Link>
            </div>
            <h2 className="h2 mb-3">{question.title}</h2>
            <p className="mb-4">{question.text}</p>
          </div>

          <div className="tags mb-6">
            { question.tags.map(tag => <div className="badge-tags">{tag}</div>) }
          </div>
        </div>

        {/* AREA: Resolution */}
        <div className="Resolution col-md-7">
          <div>
            <header>
              <h4>Resolva</h4>
              <div className="box-levels">
                {/* TODO rename the buttons */}
                <button className="btn btn-secondary">Fácil</button>
                <button className="btn btn-outline-secondary">Médio</button>
                <button className="btn btn-outline-secondary">Avançado</button>
                <button type="button" className="btn btn-secondary">
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

            {/* Component where the actions are --> answer the question/next question */}
            <div className="container-actions default">
              {/* Text and Answer */}
              {/* ... */}
              {/* Buttons */}
              <button className="btn btn-primary">Responder</button>
            </div>

            <div className="container-actions solved">
              {/* <!-- Text and Answer --> */}
              <div className="answer">
                <p>Resposta correta!</p>
                <div>10, 15, 14, 84</div>
              </div>
              {/* <!-- Buttons --> */}
              <div>
                <button type="button" className="btn btn-outline-light">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                  </svg>
                  Refazer
                </button>
                <button type="button" className="btn btn-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                  </svg>
                  Próximo Exercício
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;