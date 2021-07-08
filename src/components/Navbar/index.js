import { Link } from "react-router-dom";
import './index.css';

import { runHash } from "../../utils/hash.js"

const Navbar = () => {
  const handleDownload = () => {
    //TODO: this function and the download button is only for testing
    const element = document.createElement("a");
    const history = localStorage.getItem('history')
    const hash = runHash(history)
    const exportHistory = JSON.stringify({ hash, history: JSON.parse(history) })
    const blob = new Blob([exportHistory], { type: 'application/json' }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(blob);
    element.download = "history.json";
    element.click();
  }

  return (
    <nav className="sidenav">
      <div className="brand">
        <div className="h4">QPED</div>
        <span>Questões para <br />Estrutura de Dados</span>
      </div>

      <div className="nav-menu">
        <Link to="/" className="text-light">Início</Link>
        <Link to="/topics" className="text-light">Tópicos</Link>
        <Link to="/about" className="text-light">Sobre</Link>
        <Link to="/help" className="text-light">Ajuda</Link>
        {localStorage.getItem('history') && <Link to="/" className="text-muted" onClick={handleDownload}>Baixar Histórico</Link>}
      </div>
    </nav>
  );
}

export default Navbar;