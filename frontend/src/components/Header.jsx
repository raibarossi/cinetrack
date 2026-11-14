
import Titulo from './Titulo';

function Header() {
  return (
    <header>
      <Titulo />

      <input
        type="search"
        className="search"
        placeholder="Buscar filme"
        aria-label="Buscar filme por título ou gênero"
      />

      <button type="button" className="anchoradd">
        + Adicionar
      </button>
    </header>
  );
}

export default Header;
