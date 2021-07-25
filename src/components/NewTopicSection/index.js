const NewTopicSection = ({ handleNewTopic }) => {
  let topic = ""
  return (
    <section className="topic p-4 pb-3 mb-3">
      <input className="h4 mb-3" placeholder="Novo tópico" onChange={(e) => topic = e.target.value}></input>
      <button onClick={() => handleNewTopic(topic)}>Adicionar</button>
    </section>
  );
}

export default NewTopicSection;
