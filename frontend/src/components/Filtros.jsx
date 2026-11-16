function Filtros({ ativo, aoMudar }) {
  return (
    <nav aria-label="Filtros de status">
      <button
        type="button"
        className={ativo === "todos" ? "ativo" : ""}
        onClick={() => aoMudar("todos")}
      >
        Todos
      </button>

      <button
        type="button"
        className={ativo === "assistido" ? "ativo" : ""}
        onClick={() => aoMudar("assistido")}
      >
        Assistido
      </button>

      <button
        type="button"
        className={ativo === "assistindo" ? "ativo" : ""}
        onClick={() => aoMudar("assistindo")}
      >
        Assistindo
      </button>

      <button
        type="button"
        className={ativo === "quero" ? "ativo" : ""}
        onClick={() => aoMudar("quero")}
      >
        Quero assistir
      </button>
    </nav>
  );
}

export default Filtros;