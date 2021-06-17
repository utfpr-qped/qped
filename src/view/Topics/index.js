import { Link } from "react-router-dom";
import "./index.css";

const Topics = () => {
  return (
    <div className="Topics container w-50">
      <header className="mt-5 mb-4">
        <h1>Tópicos</h1>
      </header>

      <section className="topic p-3">
        <h2 className="h4 mb-4">Lista encadeada</h2>
        <Link to="/viewquestion">Busca sequencial em um vetor</Link>
        <Link to="">Busca sequencial em um vetor</Link>
        <Link to="">Busca sequencial em um vetor</Link>
      </section>
    </div>
  );
}
 
export default Topics;