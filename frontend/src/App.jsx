
import { useState } from "react";

import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListaFilmes from "./components/ListaFilmes";
import ModalFilme from "./components/ModalFilme";

import { filmesIniciais, gerarId } from "./data/filmes";

function App() {
  const [filmes, setFilmes] = useState(filmesIniciais);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  function adicionar(novoFilme) {
    const filmeComId = {
      ...novoFilme,
      id: gerarId(filmes)
    };

    setFilmes((listaAtual) => [...listaAtual, filmeComId]);
  }

  function remover(id) {
    setFilmes((listaAtual) =>
      listaAtual.filter((filme) => filme.id !== id)
    );
  }

  function editar(id, alteracoes) {
    setFilmes((listaAtual) =>
      listaAtual.map((filme) =>
        filme.id === id
          ? { ...filme, ...alteracoes }
          : filme
      )
    );
  }

  function abrirCadastro() {
    setFilmeEmEdicao(null);
    setModalAberto(true);
  }

  function abrirEdicao(filme) {
    setFilmeEmEdicao(filme);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setFilmeEmEdicao(null);
  }

  function salvarFilme(dados) {
    if (filmeEmEdicao) {
      editar(filmeEmEdicao.id, dados);
    } else {
      adicionar(dados);
    }

    fecharModal();
  }

  const visiveis = filmes.filter((filme) => {
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
        aoAdicionar={abrirCadastro}
      />

      <Filtros
        ativo={status}
        aoMudar={setStatus}
      />

      <main>
        <ListaFilmes
          filmes={visiveis}
          onEditar={abrirEdicao}
          onRemover={remover}
        />
      </main>

      <footer>
        <small>
          CineTrack © {new Date().getFullYear()} ·
          {visiveis.length} filmes encontrados
        </small>
      </footer>

      {modalAberto && (
        <ModalFilme
          filme={filmeEmEdicao}
          onSalvar={salvarFilme}
          onFechar={fecharModal}
        />
      )}
    </>
  );
}

export default App;
