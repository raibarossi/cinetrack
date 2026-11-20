const fs = require("fs");
const path = require("path");

const filmes = [
  { id: 1, titulo: "Final Destination", ano: 2000, genero: "Terror", nota: 5, status: "assistido", comentario: "", poster: "assets/finaldestination.jpg" },
  { id: 2, titulo: "The Evil Dead", ano: 1981, genero: "Terror", nota: 4, status: "assistido", comentario: "", poster: "assets/theevildead.jpg" },
  { id: 3, titulo: "The Babysitter", ano: 2017, genero: "Terror", nota: 5, status: "assistido", comentario: "", poster: "assets/thebabysitter.jpg" },
  { id: 4, titulo: "Scream 4", ano: 2011, genero: "Terror", nota: 5, status: "assistindo", comentario: "", poster: "assets/scream4.webp" },
  { id: 5, titulo: "X", ano: 2022, genero: "Terror", nota: 5, status: "assistido", comentario: "", poster: "assets/x.jpg" },
  { id: 6, titulo: "Friday the 13th", ano: 1980, genero: "Terror", nota: 5, status: "quero", comentario: "", poster: "assets/fridaythe13.jpg" }
];

const caminhoArquivo = path.join(__dirname, "data", "filmes.json");

fs.mkdirSync(path.dirname(caminhoArquivo), { recursive: true });

fs.writeFileSync(
  caminhoArquivo,
  JSON.stringify(filmes, null, 2),
  "utf-8"
);

console.log(`${filmes.length} filmes gravados com sucesso!`);