import { useState, useEffect } from "react";
import TopicSection from "../../components/TopicSection";
import NewTopicSection from "../../components/NewTopicSection";
import ImportQuestions from "../../components/ImportQuestions";
import "./index.css";
// Questions DB
import { getParsedQuestions } from "../../utils/questions/helper";

const Topics = () => {
  const [questions, setQuestions] = useState(getParsedQuestions())
  const [shouldUpdateQuestions, setShouldUpdateQuestions] = useState(true)

  useEffect(() => {
    if (shouldUpdateQuestions) {
      setShouldUpdateQuestions(false)
    }
  }, [setShouldUpdateQuestions, shouldUpdateQuestions])

  const handleNewTopic = (title) => {
    const questionsList = questions
    questionsList[title] = []
    setQuestions(questionsList)
    setShouldUpdateQuestions(true)
  }

  return Object.keys(questions).length > 0 ? (
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
  ) : (
    <ImportQuestions />
  )
}

export default Topics;
