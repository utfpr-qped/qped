// import { useEffect, useState } from "react";
import TopicSection from "../../components/TopicSection";
// import { Link } from "react-router-dom";
import "./index.css";

// Questions DB
import { questions as database } from "../../utils/index";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'


function generateSearchOptions(questions) {
  const searchOptions = []
  const topics = Object.keys(questions)
  const ids = []
  const titles = []
  topics.forEach(topic => {
    questions[topic].forEach((question) => {
      ids.push(question.id)
      titles.push(question.title)
    })
  })
  const search = topics.concat(ids, titles)
  search.forEach((value, id) => {
    searchOptions.push({ id, value })
  })
  return searchOptions
}
const searchOptions = generateSearchOptions(database)

function testChange(itens) {
  console.log(itens)
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Topics = () => {
  return (
    <div className="Topics container w-50">
      <ReactSearchAutocomplete
        items={searchOptions}
        //   onSearch={handleOnSearch}
        //onHover={handleOnHover}
        onSelect={testChange}
        //onFocus={handleOnFocus}
        autoFocus
      />
      <header className="mt-5 mb-4">
        <h1>Tópicos</h1>
      </header>
      {
        Object.keys(database).map((topic, index) => {
          return <TopicSection
            questionList={database[topic]}
            sectionTitle={capitalizeFirstLetter(topic)}
            key={index}
          />
        })
      }
    </div>
  );
}

export default Topics;
