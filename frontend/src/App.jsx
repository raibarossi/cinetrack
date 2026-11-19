
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListaFilmes from "./components/ListaFilmes";
import ModalFilme from "./components/ModalFilme";

import { gerarId } from "./data/filmes";
import { listar } from "./api";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  // Carrega os filmes quando o componente é montado
  useEffect(() => {
    async function carregarFilmes() {
      try {
        const dados = await listar();
        setFilmes(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarFilmes();
  }, []);

  // Atualiza o título da aba conforme a quantidade de filmes
  useEffect(() => {
    document.title = `CineTrack - ${filmes.length} filmes`;
  }, [filmes.length]);

  function adicionar(novoFilme) {
    setFilmes((listaAtual) => [
      ...listaAtual,
      {
        ...novoFilme,
        id: gerarId(listaAtual)
      }
    ]);
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
        {carregando ? (
          <p>Carregando filmes...</p>
        ) : erro ? (
          <p>Erro ao carregar filmes: {erro}</p>
        ) : (
          <ListaFilmes
            filmes={visiveis}
            onEditar={abrirEdicao}
            onRemover={remover}
          />
        )}
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
