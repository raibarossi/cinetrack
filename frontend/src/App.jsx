
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListaFilmes from './components/ListaFilmes';
import { filmesIniciais } from './data/filmes';

function App() {
  return (
    <>
      <Header />

      <Filtros />

      <main>
        <ListaFilmes filmes={filmesIniciais} />
      </main>

      <footer>
        <small>
          CineTrack © {new Date().getFullYear()} ·
          {filmesIniciais.length} filmes cadastrados
        </small>
      </footer>
    </>
  );
}

export default App;
