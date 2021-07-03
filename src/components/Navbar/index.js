import { Link } from "react-router-dom";
import './index.css';

const Navbar = () => {
  return (
    <nav className="sidenav">
      <div className="brand">
        <div className="h3">QPED</div>
        <span>Questões para <br/>Estrutura de Dados</span>
      </div>

      <div className="nav-menu">
        <Link to="/" className="text-light">Início</Link>
        <Link to="/topics" className="text-light">Tópicos</Link>
        <Link to="/about" className="text-light">Sobre</Link>
        <Link to="/help" className="text-light">Ajuda</Link>
      </div>
    </nav>
  );
}

export default Navbar;