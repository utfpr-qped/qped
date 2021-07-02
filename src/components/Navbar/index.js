import './index.css';

const Navbar = () => {
  return (
    <nav className="sidenav">
      <div className="brand">
        <div className="h3">QPED</div>
        <span>Questões para Estrutura de Dados</span>
      </div>

      <div className="nav-menu">
        <a href="#" className="text-light">Início</a>
        <a href="#" className="text-light">Questões</a>
        <a href="#" className="text-light">Sobre</a>
        <a href="#" className="text-light">Ajuda</a>
      </div>
    </nav>
  );
}

export default Navbar;