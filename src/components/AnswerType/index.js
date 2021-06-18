import { useRef } from "react";
import "./index.css";

function verifyAnswer({ answerFunction, input }) {
  const values = { vet: [10, 20, 30], valor: 10 }
  // eslint-disable-next-line
  const answer = eval(`(${answerFunction})(${JSON.stringify(values)}, ${input})`)
  alert(answer ? "Correto!" : "Errado :(")
}

export const TrueOrFalse = ({ answerFunction }) => {
  return (
    <div className="TrueOrFalse mb-3 w-50">
      <label className="form-label">Verifique o resultado abaixo e responda:</label>
      <textarea className="form-control mb-3" placeholder="10, 15, 14, 84" style={{ height: 100 + 'px' }} disabled></textarea>
      <div className="options-container">
        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option11" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="option11" onClick={() => verifyAnswer({ answerFunction, input: 1 })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            Correto
          </label>
        </div>

        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option22" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="option22" onClick={() => verifyAnswer({ answerFunction, input: 2 })}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Incorreto</label>
        </div>
      </div>
    </div>
  );
}

export const Alternative = () => {
  return (
    <div className="Alternative mb-3 w-50">
      <label className="form-label">Selecione a alternativa correta:</label>
      <div className="options-container">
        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option1" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="option1">100, 15, 14, 84</label>
        </div>
        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option2" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="option2">1234, 15, 14, 84</label>
        </div>
        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option3" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="option3">78, 54, 15, 14, 84</label>
        </div>
      </div>
    </div>
  );
}

export const Written = ({ answerFunction, values }) => {
  const refTextarea = useRef(null)

  function newVerifyAnswer({ answerFunction, values }) {
    let input = refTextarea.current.value
    const answer = eval(`(${answerFunction})(${JSON.stringify(values)}, ${input})`)
    alert(answer ? "Correto!" : "Errado :(")
  }
  
  return (
    <div className="Written mb-3 w-50">
      <label className="form-label">Digite sua resposta abaixo:</label>
      <div className="input-group">
        <span className="input-group-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-arrow-return-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
          </svg>
        </span>
        <textarea className="form-control" placeholder="Sua resposta..." aria-label="Textarea" ref={refTextarea}></textarea>
        <button onClick={() => newVerifyAnswer({ answerFunction, values })}>Verificar</button>
      </div>
    </div>
  );
}
