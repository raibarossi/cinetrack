import Titulo from "./Titulo";

function Header({ busca, aoBuscar, aoAdicionar }) {
  return (
    <header>
      <Titulo />

      <input
        type="search"
        className="search"
        placeholder="Buscar filme"
        aria-label="Buscar filme por título ou gênero"
        value={busca}
        onChange={(evento) => aoBuscar(evento.target.value)}
      />

      <button
        type="button"
        className="anchoradd"
        onClick={aoAdicionar}
>
       + Adicionar
      </button>
    </header>
  );
}

export default Header;