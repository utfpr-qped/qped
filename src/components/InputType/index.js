import { useState, useEffect, useRef } from "react";
import "./index.css";

/**
 * TrueOrFalse
 */
const TrueOrFalse = ({ options, setUserInput }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="TrueOrFalse mb-3 w-50" >
      <label className="form-label">Verifique o resultado abaixo e responda:</label>
      <textarea className="form-control mb-3" defaultValue={options[0]} style={{ height: 100 + 'px' }} readOnly></textarea>
      
      <div className="options-container">
        {/* Option: True */}
        <div className="mb-2">
          <input 
            type="radio" 
            value={options[0]}
            className="btn-check" 
            name="trueOrFalseOptions" 
            id="option-true"
            checked={selectedOption === options[0]}
            onChange={() => {
              setSelectedOption(options[0])
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
            value={options[1]}
            className="btn-check" 
            name="trueOrFalseOptions" 
            id="option-false"
            checked={selectedOption === options[1]}
            onChange={() => {
              setSelectedOption(options[1]) 
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
  const [selectedOption, setSelectedOption] = useState(null)
  
  return (
    <div className="MultipleChoice mb-3 w-50">
      <label className="form-label">Selecione a alternativa correta:</label>
      <div className="options-container">
        {options.map((option, index) => {
          const id = `option${index + 1}`
          return (
            <div className="mb-2" key={index}>
              <input 
                type="radio" 
                value={option}
                className="btn-check" 
                name="multipleChoiceOptions" 
                id={id} 
                checked={selectedOption === option}
                onChange={() => {
                  setSelectedOption(option) 
                  setUserInput(option)
                }}
              />
              <label className="btn btn-outline-dark" htmlFor={id}>{option.toString()}</label>
            </div>
          )
        })}
      </div>
    </div>
  );
}

/**
 * Written
 */
const Written = ({ options, setUserInput }) => {
  const refTextArea = useRef()
  
  useEffect(() => {
    // clear the textarea when the options change
    refTextArea.current.value = ''
  }, [options])

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
          ref={refTextArea}
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
 * Parent component that decides which type of input to display onscreen
 * @param type:string - type of input
 * @param setUserInput:function - stores the user input in the parent component
 * @returns </> - a type of input (TrueOrFalse, MultipleChoice, Written)
 */
const InputType = ({ type, trueOrFalseOptions, multipleChoiceOptions, setUserInput }) => {  
  return (
    <>
      { type === 'easy' ? <TrueOrFalse options={trueOrFalseOptions} setUserInput={setUserInput} /> : null }
      { type === 'medium' ? <MultipleChoice options={multipleChoiceOptions} setUserInput={setUserInput} /> : null }
      { type === 'hard' ? <Written options={trueOrFalseOptions} setUserInput={setUserInput} /> : null }
    </>
  )
}

export default InputType
