import { useState } from "react";

import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListaFilmes from "./components/ListaFilmes";

import { filmesIniciais } from "./data/filmes";

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const visiveis = filmesIniciais.filter((filme) => {
    const correspondeStatus =
      status === "todos" || filme.status === status;

    const textoBusca = busca.toLowerCase();

    const correspondeBusca =
      filme.titulo.toLowerCase().includes(textoBusca) ||
      filme.genero.toLowerCase().includes(textoBusca);

    return correspondeStatus && correspondeBusca;
  });

  return (
    <>
      <Header
        busca={busca}
        aoBuscar={setBusca}
      />

      <Filtros
        ativo={status}
        aoMudar={setStatus}
      />

      <main>
        <ListaFilmes filmes={visiveis} />
      </main>

      <footer>
        <small>
          CineTrack © {new Date().getFullYear()} ·
          {visiveis.length} filmes encontrados
        </small>
      </footer>
    </>
  );
}

export default App;