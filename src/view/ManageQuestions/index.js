import { useState, useEffect } from "react";
import TopicSection from "../../components/TopicSection";
import NewTopicSection from "../../components/NewTopicSection";
import ImportQuestions from "../../components/ImportQuestions";
import { ExportCard } from "../../components/EventsHistoryActions";
import "./index.css";
// Questions DB
import { getParsedQuestions } from "../../utils/questions/helper";
import { stringifyQuestionsFile } from "../../utils/questions";

const Topics = () => {
  const [questions, setQuestions] = useState(getParsedQuestions())
  const [shouldUpdateQuestions, setShouldUpdateQuestions] = useState(true)

  useEffect(() => {
    if (shouldUpdateQuestions) {
      setShouldUpdateQuestions(false)
    }
  }, [setShouldUpdateQuestions, shouldUpdateQuestions])


  const handleExport = () => {
    //TODO: change verification method and feedback
    //verify if localStorage exists
    const q = stringifyQuestionsFile(getParsedQuestions())

    const element = document.createElement("a");
    const blob = new Blob([q], { type: 'application/json' }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(blob);
    element.download = "questions.json";
    element.click();
  }

  const handleNewTopic = (title) => {
    const questionsList = questions
    questionsList[title] = []
    setQuestions(questionsList)
    setShouldUpdateQuestions(true)
  }

  return Object.keys(questions).length > 0 ? (
    <section>
      <ExportCard handleExport={handleExport} />
      <div className="Topics container w-50 py-5">
        {
          Object.keys(questions).map((topic, index) => {
            return questions[topic].length > 0 ?
              (<TopicSection
                questionList={questions[topic]}
                sectionTitle={topic}
                editSubject={topic}
                key={index}
              />) :
              (<TopicSection
                sectionTitle={topic}
                editSubject={topic}
                key={index}
                isNewTopic={true} />)
          })
        }
        <NewTopicSection handleNewTopic={(title) => handleNewTopic(title)} />
      </div>
    </section>
  ) : (
    <ImportQuestions />
  )
}

export default Topics;
