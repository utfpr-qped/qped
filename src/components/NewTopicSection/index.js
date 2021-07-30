import { useState } from "react";

const NewTopicSection = ({ handleNewTopic }) => {
  const [topicName, setTopicName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nome do tópico"
          aria-label="Novo tópico"
          aria-describedby="button-newtopic"
          value={topicName || ''}
          onChange={(e) => setTopicName(e.target.value)}
        />
        <button
          className={`btn ${!feedbackMsg ? "btn-secondary" : "btn-success"}`}
          type="button"
          id="button-newtopic"
          onClick={() => {
            if(topicName) {
              handleNewTopic(topicName)
              setTopicName("")
              setFeedbackMsg("Adicionado")
              setTimeout(() => {
                setFeedbackMsg(null)
              }, 1000);
            }
          }}
        >
          {feedbackMsg || "Adicionar"}
        </button>
      </div>
    </div>
  );
};

export default NewTopicSection;
