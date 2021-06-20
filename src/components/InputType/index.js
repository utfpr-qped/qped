import "./index.css";

/**
 * TrueOrFalse
 */
/*const TrueOrFalse = ({ question }) => {
  function verifyTrueOrFalseAnswer(input) {
    const answerFunction = question.verifyAnswer
    const userInput = input === true ? question.trueOrFalseOptions[0] : question.trueOrFalseOptions[1]
    const values = question.values
    // eslint-disable-next-line
    const answer = eval(`(${answerFunction})(${JSON.stringify(values)}, ${userInput})`)
    alert(answer ? "Correto!" : "Errado :(")
  }

  return (
    < div className="TrueOrFalse mb-3 w-50" >
      <label className="form-label">Verifique o resultado abaixo e responda:</label>
      <textarea className="form-control mb-3" placeholder={question.trueOrFalseOptions[0]} style={{ height: 100 + 'px' }} disabled></textarea>
      <div className="options-container">
        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option11" autoComplete="off" />
          <label
            className="btn btn-outline-dark"
            htmlFor="option11"
            onClick={() => verifyTrueOrFalseAnswer(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            Correto
          </label>
        </div>

        <div className="mb-2">
          <input type="radio" className="btn-check" name="options-outlined" id="option22" autoComplete="off" />
          <label
            className="btn btn-outline-dark"
            htmlFor="option22"
            onClick={() => verifyTrueOrFalseAnswer(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Incorreto</label>
        </div>
      </div>
    </div >
  );
}*/

/**
 * MultipleChoice
 */
/*const MultipleChoice = ({ question }) => {
  function verifyAnswer(optionIndex) {
    const answerFunction = question.verifyAnswer
    const userInput = question.options[optionIndex]
    const values = question.values
    // eslint-disable-next-line
    const answer = eval(`(${answerFunction})(${JSON.stringify(values)}, ${userInput})`)
    alert(answer ? "Correto!" : "Errado :(")
  }

  return (
    <div className="MultipleChoice mb-3 w-50">
      <label className="form-label">Selecione a alternativa correta:</label>
      <div className="options-container">
        {
          question.options.map((option, index) => {
            const id = `option${index + 1}`
            return <div className="mb-2" key={index} onClick={() => { verifyAnswer(index) }}>
              <input type="radio" className="btn-check" name="options-outlined" id={id} autoComplete="off" />
              <label className="btn btn-outline-dark" htmlFor={id}>{option}</label>
            </div>
          })
        }
      </div>
    </div>
  );
}*/

/**
 * Written
 */
const Written = ({ setUserInput }) => {
  // Enviar a resposta do usuario para o 'userInput', que é um state localizado no componente pai 
  const handleChange = e => {
    // TODO talvez seja preciso tratar o que é enviado quando for outros tipos de respostas
    setUserInput(e.target.value)
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
        <textarea className="form-control" placeholder="Sua resposta..." aria-label="Textarea" onChange={handleChange}></textarea>
      </div>
    </div>
  )
}

/**
 * Componente padrão que decide qual tipo de componente exibir
 * @param type:string - tipo do componente que sera exibido
 * @param setUserInput:function - armazena a resposta do usuario
 * @returns () - um tipo de componente (TrueOrFalse, MultipleChoice, Written)
 */
 const InputType = ({ type, setUserInput }) => {  
  return (
    <>
      {/* TODO find a better way to display each component */}
      {/* { type === 'easy' ? <TrueOrFalse /> : null } */}
      {/* { type === 'medium' ? <MultipleChoice /> : null } */}
      { type === 'hard' ? <Written setUserInput={setUserInput} /> : null }
    </>
  )
}

export default InputType