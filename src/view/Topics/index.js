// import { useEffect, useState } from "react";
import TopicSection from "../../components/TopicSection";
// import { Link } from "react-router-dom";
import "./index.css";

// Questions DB
import { questions as database } from "../../utils/questions";

const Topics = () => { 
  return (
    <div className="Topics container w-50">
      <header className="mt-5 mb-4">
        <h1>Tópicos</h1>
      </header>

      {/* 
        TODO 
        - find a better way to populate the page with the sections of each topic, 
          instead of manually calling each section  
      */}

      {
        // ! Tópico de BUSCA
        database.busca.length ? (
          <TopicSection questionList={database.busca} sectionTitle="Busca" />
        ) : (null)
      }
      {
        // ! Tópico de PILHA
        database.pilha.length ? (
          <TopicSection questionList={database.pilha} sectionTitle="Pilha" />
        ) : (null)
      }
      
      {
        // ! Tópico de FILA
        database.fila.length ? (
          <TopicSection questionList={database.fila} sectionTitle="Fila" />
        ) : (null)
      }
    </div>
  );
}
 
export default Topics;
