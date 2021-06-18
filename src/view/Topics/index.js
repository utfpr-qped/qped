// import { useEffect, useState } from "react";
import TopicSection from "../../components/TopicSection";
// import { Link } from "react-router-dom";
import "./index.css";

// Questions DB
import { questions as database } from "../../utils/index";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Topics = () => {
  return (
    <div className="Topics container w-50">
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
