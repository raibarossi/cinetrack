const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Caminho do arquivo de filmes
const caminhoArquivo = path.join(__dirname, "data", "filmes.json");

// Lê os filmes salvos no JSON
function lerFilmes() {
  const conteudo = fs.readFileSync(caminhoArquivo, "utf-8");
  return JSON.parse(conteudo);
}

// Salva a lista de filmes no JSON
function salvarFilmes(lista) {
  fs.writeFileSync(
    caminhoArquivo,
    JSON.stringify(lista, null, 2),
    "utf-8"
  );
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

// POST /filmes
// Cadastra um novo filme
app.post("/filmes", (req, res) => {
  const { titulo, ano } = req.body;

  if (!titulo || !titulo.trim() || ano === undefined || ano === null || ano === "") {
    return res.status(400).json({
      erro: "Título e ano são obrigatórios."
    });
  }

  const filmes = lerFilmes();

  const novoFilme = {
    ...req.body,
    id: filmes.length === 0
      ? 1
      : Math.max(...filmes.map((filme) => filme.id)) + 1
  };

  filmes.push(novoFilme);
  salvarFilmes(filmes);

  res.status(201).json(novoFilme);
});

// PUT /filmes/:id
// Atualiza um filme existente, preservando seu ID
app.put("/filmes/:id", (req, res) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);

  const indice = filmes.findIndex((filme) => filme.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Filme não encontrado."
    });
  }

  filmes[indice] = {
    ...filmes[indice],
    ...req.body,
    id: filmes[indice].id
  };

  salvarFilmes(filmes);

  res.json(filmes[indice]);
});

// DELETE /filmes/:id
// Remove um filme existente
app.delete("/filmes/:id", (req, res) => {
  const filmes = lerFilmes();
  const id = Number(req.params.id);

  const novaLista = filmes.filter((filme) => filme.id !== id);

  if (novaLista.length === filmes.length) {
    return res.status(404).json({
      erro: "Filme não encontrado."
    });
  }

  salvarFilmes(novaLista);

  res.status(204).end();
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});