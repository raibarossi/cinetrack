
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Filtros from "./components/Filtros";
import ListaFilmes from "./components/ListaFilmes";
import ModalFilme from "./components/ModalFilme";

import { listar, criar, atualizar, remover } from "./api";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  // Carrega os filmes da API quando o componente é montado
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

  // Abre o modal para cadastrar um filme
  function abrirCadastro() {
    setFilmeEmEdicao(null);
    setModalAberto(true);
  }

  // Abre o modal para editar um filme
  function abrirEdicao(filme) {
    setFilmeEmEdicao(filme);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setFilmeEmEdicao(null);
  }

  // Salva ou atualiza um filme na API antes de atualizar o estado
  async function salvarFilme(dados) {
    try {
      if (filmeEmEdicao) {
        const filmeAtualizado = await atualizar(
          filmeEmEdicao.id,
          dados
        );

        setFilmes((listaAtual) =>
          listaAtual.map((filme) =>
            filme.id === filmeAtualizado.id
              ? filmeAtualizado
              : filme
          )
        );
      } else {
        const novoFilme = await criar(dados);

        setFilmes((listaAtual) => [
          ...listaAtual,
          novoFilme
        ]);
      }

      fecharModal();
    } catch (erro) {
      alert(`Não foi possível salvar o filme: ${erro.message}`);
    }
  }

  // Remove o filme da API antes de atualizar o estado
  async function removerFilme(id) {
    try {
      await remover(id);

      setFilmes((listaAtual) =>
        listaAtual.filter((filme) => filme.id !== id)
      );
    } catch (erro) {
      alert(`Não foi possível remover o filme: ${erro.message}`);
    }
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
            onRemover={removerFilme}
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
