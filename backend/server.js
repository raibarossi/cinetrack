
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Caminho do arquivo de filmes
const caminhoArquivo = path.join(__dirname, "data", "filmes.json");

// Lê os filmes salvos no JSON
function lerFilmes() {
  const conteudo = fs.readFileSync(caminhoArquivo, "utf-8");
  return JSON.parse(conteudo);
}

// GET /filmes
// Lista todos os filmes ou filtra por status
app.get("/filmes", (req, res) => {
  let filmes = lerFilmes();

  const { status } = req.query;

  if (status) {
    filmes = filmes.filter((filme) => filme.status === status);
  }

  res.json(filmes);
});

// GET /filmes/:id
// Busca um filme específico pelo ID
app.get("/filmes/:id", (req, res) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);

  const filme = filmes.find((filme) => filme.id === id);

  if (!filme) {
    return res.status(404).json({
      erro: "Filme não encontrado."
    });
  }

  res.json(filme);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
