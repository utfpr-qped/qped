import { useState, useEffect, useRef } from "react";
import "./index.css";
// Assets
import { Check2, X, ArrowReturnRight } from "../../assets/Icons";

/**
 * TrueOrFalse
 */
const TrueOrFalse = ({ options, setUserInput }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="TrueOrFalse mb-3 w-75" >
      <label className="form-label">Verifique o resultado abaixo e responda:</label>
      <textarea className="form-control mb-3" value={options[0].join(', ')} style={{ height: 100 + 'px' }} readOnly></textarea>
      
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
            <span><Check2 /></span>
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
            <span><X /></span>
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
              <label className="btn btn-outline-dark" htmlFor={id}>{option.join(', ')}</label>
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
          <ArrowReturnRight />
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
