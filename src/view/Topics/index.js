import { useEffect, useState } from "react";
import TopicSection from "../../components/TopicSection";
// import { Link } from "react-router-dom";
import "./index.css";

// Questions DB
import { QuestionsDB as questions } from "../../utils/questions";

const Topics = () => { 
  return (
    <div className="Topics container w-50">
      <header className="mt-5 mb-4">
        <h1>Tópicos</h1>
      </header>

      {
        // ! Tópico de BUSCA
        questions.busca.length ? (
          <TopicSection questionList={questions.busca} sectionTitle="Busca" />
        ) : (null)
      }
      {
        // ! Tópico de PILHA
        questions.pilha.length ? (
          <TopicSection questionList={questions.pilha} sectionTitle="Pilha" />
        ) : (null)
      }
      
      {
        // ! Tópico de FILA
        questions.fila.length ? (
          <TopicSection questionList={questions.fila} sectionTitle="Fila" />
        ) : (null)
      }
    </div>
  );
}
 
export default Topics;
