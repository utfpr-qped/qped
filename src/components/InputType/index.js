import { useState } from "react";
import "./index.css";

/**
 * ! TrueOrFalse
 * It receives an array with two options (one is correct, the other is not) 
 * 
 * The index of the correct option varies from 0 to 1
 * The user must select if the option showing onscreen is correct or not
 * They do that by passing as their answer the option at index 0 or 1
 * 
 * The parent component will receive either the correct or incorrect answer and it will check it is equal to the correct answer of that question
 * 
 * @param options [], two values, one is correct and the other is incorrect
 * @param setUserInput (), store the answer of the  user in a state in the parent component
 * 
 * @returns TrueOrFalse component
 */
const TrueOrFalse = ({ options, setUserInput }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="TrueOrFalse mb-3 w-75" >
      <label className="form-label">Verifique o resultado abaixo e responda:</label>
      <textarea className="form-control mb-3" defaultValue={options[0]} style={{ height: 100 + 'px' }} readOnly></textarea>
      
      <div className="options-container">
        {/* Option: True */}
        <div className="mb-2">
          <input 
            type="radio" 
            value="correct"
            className="btn-check" 
            name="trueOrFalseOptions" 
            id="option-true"
            checked={selectedOption === 'correct'}
            onChange={e => {
              setSelectedOption(e.target.value)
              setUserInput(options[0])
            }}
          />
          <label className="btn btn-outline-dark" htmlFor="option-true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            Correto
          </label>
        </div>

        {/* Option: False */}
        <div className="mb-2">
          <input 
            type="radio" 
            value="incorrect"
            className="btn-check" 
            name="trueOrFalseOptions" 
            id="option-false"
            checked={selectedOption === 'incorrect'}
            onChange={e => {
              setSelectedOption(e.target.value)
              setUserInput(options[1])
            }}
          />
          <label className="btn btn-outline-dark" htmlFor="option-false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Incorreto
          </label>
        </div>
      </div>
    </div >
  );
}

/**
 * MultipleChoice
 */
const MultipleChoice = ({ options, setUserInput }) => {
  return (
    <div className="MultipleChoice mb-3 w-50">
      <label className="form-label">Selecione a alternativa correta:</label>
      <div className="options-container">
        {
          options.map((option, index) => {
            const id = `option${index + 1}`
            return (
              <div className="mb-2" key={index} onClick={() => { setUserInput(option) }}>
                <input type="radio" className="btn-check" name="multipleChoiceOptions" id={id} />
                <label className="btn btn-outline-dark" htmlFor={id}>{option.toString()}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

/**
 * Written
 */
const Written = ({ setUserInput }) => {
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
        <textarea 
          className="form-control" 
          placeholder="Sua resposta..." 
          aria-label="Textarea" 
          onChange={e => {
            setUserInput(e.target.value)
          }}>
        </textarea>
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
const InputType = ({ type, trueOrFalseOptions, multipleChoiceOptions, setUserInput }) => {  
  return (
    <>
      {/* TODO find a better way to display each component */}
      { type === 'easy' ? <TrueOrFalse options={trueOrFalseOptions} setUserInput={setUserInput} /> : null }
      { type === 'medium' ? <MultipleChoice options={multipleChoiceOptions} setUserInput={setUserInput} /> : null }
      { type === 'hard' ? <Written setUserInput={setUserInput} /> : null }
    </>
  )
}

export default InputType
