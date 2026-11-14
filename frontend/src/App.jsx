
import Titulo from './components/Titulo';

function App() {
  return (
    <main>
      <Titulo />

      <footer>
        <p>© {new Date().getFullYear()} CineTrack</p>
      </footer>
    </main>
  );
}

export default App;
