import { useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TopicSection from "../../components/TopicSection";
// import { Link } from "react-router-dom";
import "./index.css";
// Questions DB
import { questions as database } from "../../utils/index";
import topicsHelper from "./topicsHelper"
const helper = topicsHelper()

const Topics = () => {
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
    <div className="Topics container w-50 py-5">
      <header className="mb-4">
        <h1 className="mb-4">Tópicos</h1>

        <ReactSearchAutocomplete
          items={searchOptions}
          onSelect={onSelect}
          onClear={onClear}
          onSearch={onSearch}
          placeholder='Buscar questões'
        />
      </header>
      {
        Object.keys(questions).map((topic, index) => {
          return <TopicSection
            questionList={questions[topic]}
            sectionTitle={helper.capitalizeFirstLetter({ string: topic })}
            key={index}
          />
        })
      }
    </div>
  );
}

export default Topics;
