
import CardFilme from './CardFilme';

function ListaFilmes({ filmes, onEditar, onRemover }) {
  if (filmes.length === 0) {
    return <p>Nenhum filme cadastrado.</p>;
  }

  return (
    <section id="lista" aria-label="Lista de filmes">
     {filmes.map((filme) => (
        <CardFilme
        key={filme.id}
        filme={filme}
        onEditar={onEditar}
        onRemover={onRemover}
  />
))}
    </section>
  );
}

export default ListaFilmes;
