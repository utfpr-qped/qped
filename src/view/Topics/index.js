import { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TopicSection from "../../components/TopicSection";
import ImportQuestions from "../../components/ImportQuestions";
import { HashLink as Link } from "react-router-hash-link";
import "./index.css";
// Questions DB
//import { questions as database } from "../../utils/questions/index";
import { getParsedQuestions } from "../../utils/questions/helper";
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
    <ImportQuestions />
  )
}

export default Topics;
