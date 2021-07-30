import { useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { HashLink as Link } from "react-router-hash-link";
// Components
import TopicSection from "../../components/TopicSection";
import ImportQuestions from "../../components/ImportQuestions";
import { NotFound } from "../../components/FeedbackBoxes"
// Assets and styles
import "./index.css";
// Utils
// Questions database
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

  return (
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
              <Link to="#tree">Árvore binária</Link>
              <Link to="#btree">Árvore binária de busca</Link>
            </div>

            <div className="mb-4">
              <ImportQuestions />
            </div>
          </div>
        </aside>

        <div className="col py-5">
          <div className="topicsList row justify-content-md-center">
            <div className="col-md-11">
              <h2 className="h5 mb-4 text-muted">Lista de questões</h2>

              {
                Object.keys(questions).length > 0
                  ? Object.keys(questions).map((topic, index) => {
                    return (

                      <TopicSection
                        questionList={questions[topic]}
                        sectionId={topic}
                        sectionTitle={
                          topic === 'sortingAlgorithms' ? 'Algoritmos de ordenação'
                            : topic === 'searchingAlgorithms' ? 'Algoritmos de busca'
                              : topic === 'stack' ? 'Pilha estática e dinâmica'
                                : topic === 'queue' ? 'Fila'
                                  : topic === 'linkedList' ? 'Lista encadeada'
                                    : topic === 'tree' ? 'Árvore binária'
                                      : topic === 'btree' ? 'Árvore binária de busca'
                                        : "Outros"
                        }
                        key={index}
                      />
                    )
                  }) : (
                    <NotFound />
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topics;
