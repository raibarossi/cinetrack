
function CardFilme({ filme }) {
  const estrelas = "★".repeat(filme.nota) +
                   "☆".repeat(5 - filme.nota);

  const rotuloStatus = {
    assistido: "assistido",
    assistindo: "assistindo",
    quero: "quero assistir"
  };

  return (
    <article className="card">
      <img
        src={filme.poster}
        alt={`Pôster do filme ${filme.titulo}`}
        loading="lazy"
      />

      <h2>{filme.titulo}</h2>

      <p>{filme.ano} · {filme.genero}</p>

      <p className="nota">Nota: {estrelas}</p>

      <span className={`badge ${filme.status}`}>
        {rotuloStatus[filme.status]}
      </span>
    </article>
  );
}

export default CardFilme;
