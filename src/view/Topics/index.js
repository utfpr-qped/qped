import { useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TopicSection from "../../components/TopicSection";
import { HashLink as Link } from "react-router-hash-link";
import "./index.css";
// Questions DB
//import { questions as database } from "../../utils/questions/index";
import { getParsedQuestions, setParsedQuestions } from "../../utils/questions/helper";
import topicsHelper from "./topicsHelper"
const helper = topicsHelper()

const Topics = () => {
  const [database] = useState(getParsedQuestions())
  const [questions, setQuestions] = useState(database)

  const searchOptions = helper.generateSearchOptions({ questions: database })

  function onClear() {
    setQuestions(database)
  }

  function onSearch(searchString) {
    if (searchString.length <= 1) {
      setQuestions(database)
    }
  }

  function onSelect({ name, type }) {
    const questions = helper.onSelect({ name, type }, { database })
    setQuestions(questions)
  }

  const readJSONFile = file => {
    // Check if the file is a JSON
    if (file.type && !file.type.startsWith('application/json')) {
      console.error('Arquivo não é um JSON.', file.type, file)
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load', function (e) {
      setParsedQuestions(e.target.result)
      window.location.reload()
    })
    reader.readAsText(file)
  }

  function handleFileUpload(e) {
    const fileList = e.target.files
    readJSONFile(fileList[0])
  }

  return Object.keys(database).length > 0 ? (
    <div className="Topics container-fluid px-4">
      <div className="row">
        <aside className="col-lg-auto">
          <header className="mb-4">
            <h1 className="h3 mb-4">Questões</h1>
          </header>

          <div className="body">
            <ReactSearchAutocomplete
              items={searchOptions}
              onSelect={onSelect}
              onClear={onClear}
              onSearch={onSearch}
              placeholder='Escontre uma questão'
            />

            <div className="menu-topics">
              <span className="h6 text-muted">Tópicos</span>
              <Link to="#sortingAlgorithms">Algoritmos de ordenação</Link>
              <Link to="#searchingAlgorithms">Algoritmos de busca</Link>
              <Link to="#stack">Pilha estática e dinâmica</Link>
              <Link to="#queue">Fila</Link>
              <Link to="#linkedList">Lista encadeada</Link>
              <Link to="#">Árvore binária</Link>
              <Link to="#">Árvore binária de busca</Link>
            </div>
          </div>
        </aside>

        <div className="col py-5">
          <div className="topicsList row justify-content-md-center">
            <div className="col-md-11">
              <h2 className="h5 mb-4 text-muted">Lista de questões</h2>

              {
                Object.keys(questions).map((topic, index) => {
                  return <TopicSection
                    questionList={questions[topic]}
                    sectionId={topic}
                    sectionTitle={
                      topic === 'sortingAlgorithms' ? 'Algoritmos de ordenação'
                        : topic === 'searchingAlgorithms' ? 'Algoritmos de busca'
                          : topic === 'stack' ? 'Pilha estática e dinâmica'
                            : topic === 'queue' ? 'Fila'
                              : topic === 'linkedList' ? 'Lista encadeada'
                                : "Outros"
                    }
                    key={index}
                  />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // TODO: arrumar textos e estilo
    <header>
      <h2 className="h4">Importar Questoes</h2>
      <p className="text-muted mb-0">Importe o arquivo de questoes disponibilzado por seu professor</p>
      <div className="actions-wrapper">
        <label htmlFor="uploadButton" className="btn btn-dark">
          <span className="me-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z" />
              <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
            </svg>
          </span>
          Importar
        </label>
        <input type="file" id="uploadButton" onChange={handleFileUpload} accept=".json" hidden />
      </div>
    </header>
  )
}

export default Topics;
