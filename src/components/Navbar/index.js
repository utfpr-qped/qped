import { NavLink } from "react-router-dom";
import './index.css';
// Assets
import { GithubFill } from "../../assets/Icons";

const Navbar = () => {
  return (
    <nav className="sidenav">
      <div className="brand">
        <div className="h3">QPED</div>
        <span>Questões para <br />Estrutura de Dados</span>
      </div>

      <div className="nav-menu">
        <NavLink exact to="/">Painel</NavLink>
        <NavLink exact to="/topics">Questões</NavLink>
        <NavLink exact to="/manage">Histórico</NavLink>
        <NavLink exact to="/manage-questions">Configurar</NavLink>
      </div>

      <div className="nav-footer">
        <span>
          <a href="https://github.com/utfpr-qped/qped" target="_blank" rel="noreferrer"><GithubFill /></a>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;