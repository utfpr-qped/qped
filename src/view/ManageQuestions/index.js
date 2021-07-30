import { useState, useEffect } from "react";
import TopicSection from "../../components/TopicSection";
import NewTopicSection from "../../components/NewTopicSection";
import ImportQuestions from "../../components/ImportQuestions";
import { HashLink as Link } from "react-router-hash-link";
import { ExportCard } from "../../components/EventsHistoryActions";
import "./index.css";
// Questions DB
import { getParsedQuestions } from "../../utils/questions/helper";
import { stringifyQuestionsFile } from "../../utils/questions";
import { NotFound } from "../../components/FeedbackBoxes";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState(getParsedQuestions());
  const [shouldUpdateQuestions, setShouldUpdateQuestions] = useState(true);

  useEffect(() => {
    if (shouldUpdateQuestions) {
      setShouldUpdateQuestions(false);
    }
  }, [setShouldUpdateQuestions, shouldUpdateQuestions]);

  const handleExport = () => {
    //TODO: change verification method and feedback
    //verify if localStorage exists
    const q = stringifyQuestionsFile(getParsedQuestions());

    const element = document.createElement("a");
    const blob = new Blob([q], { type: "application/json" }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(blob);
    element.download = "questions.json";
    element.click();
  };

  const handleNewTopic = (title) => {
    const questionsList = questions;
    questionsList[title] = [];
    setQuestions(questionsList);
    setShouldUpdateQuestions(true);
  };

  // ! View questions and actions for adding question and exporting a new question file
  return (
    <div className="ManageQuestions container-fluid px-4">
      <div className="row">
        <aside className="col-lg-auto">
          <header className="mb-4">
            <h1 className="h3 mb-4">Gerenciar Questões</h1>

            <NewTopicSection
              handleNewTopic={(title) => handleNewTopic(title)}
            />
          </header>

          <div className="body">
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

            {Object.keys(questions).length > 0 && (
              <div className="mb-4">
                <ExportCard
                  text="Exporte um arquivo com a versão mais atual do banco de questões."
                  handleExport={handleExport}
                />
              </div>
            )}
          </div>
        </aside>
        <div className="col py-5">
          <div className="topicsList row justify-content-md-center">
            <div className="col-md-11">
              <h2 className="h5 mb-4 text-muted">Lista de questões</h2>

              <div className="mb-4">
                {Object.keys(questions).length > 0 ? (
                  Object.keys(questions).map((topic, index) => {
                    return questions[topic].length > 0 ? (
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
                        editSubject={topic}
                        key={index}
                      />
                    ) : (
                      <TopicSection
                        sectionTitle={
                          topic === "sortingAlgorithms"
                            ? "Algoritmos de ordenação"
                            : topic === "searchingAlgorithms"
                            ? "Algoritmos de busca"
                            : topic === "stack"
                            ? "Pilha estática e dinâmica"
                            : topic === "queue"
                            ? "Fila"
                            : topic === "linkedList"
                            ? "Lista encadeada"
                            : topic
                        }
                        editSubject={topic}
                        key={index}
                        isNewTopic={true}
                      />
                    );
                  })
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;
