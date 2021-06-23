import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0A2A66' }}>
      <div className="container-fluid">
        <Link className="navbar-brand h1 my-0" to="/">
          {/* <img src="brand-logo.svg" className="d-inline-block align-text-top"> */}
          QPED
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/topics" className="nav-link">Tópicos</Link>
            <Link to="/" className="nav-link">Sobre</Link>
            <Link to="/" className="nav-link">Ajuda</Link>
          </ul>
          <span className="navbar-text">
            Questões para Estrutura de Dados
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;