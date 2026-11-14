
import CardFilme from './CardFilme';

function ListaFilmes({ filmes }) {
  if (filmes.length === 0) {
    return <p>Nenhum filme cadastrado.</p>;
  }

  return (
    <section id="lista" aria-label="Lista de filmes">
      {filmes.map(filme => (
        <CardFilme
          key={filme.id}
          filme={filme}
        />
      ))}
    </section>
  );
}

export default ListaFilmes;
