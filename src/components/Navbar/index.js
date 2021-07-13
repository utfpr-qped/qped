import { NavLink } from "react-router-dom";
import './index.css';
// Assets
import { GithubFill } from "../../assets/Icons";

const Navbar = () => {
  const handleDownload = () => {
    //TODO: this function and the download button is only for testing
    const element = document.createElement("a");
    const blob = new Blob([localStorage.getItem('history')], {type: 'application/json'}); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(blob);
    element.download = "history.json";
    element.click();
  }

  return (
    <nav className="sidenav">
      <div className="brand">
        <div className="h3">QPED</div>
        <span>Questões para <br/>Estrutura de Dados</span>
      </div>

      <div className="nav-menu">
        <NavLink exact to="/">Início</NavLink>
        <NavLink exact to="/topics">Questões</NavLink>
        <NavLink to="/about">Sobre</NavLink>
        <NavLink to="/help">Ajuda</NavLink>
      </div>

      <div className="nav-footer">
        <span><GithubFill /></span>
      </div>
    </nav>
  );
}

export default Navbar;