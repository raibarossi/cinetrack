function rotuloStatus(status) {
    if (status === "assistido") {
        return "assistido";
    }

    if (status === "assistindo") {
        return "assistindo";
    }

    if (status === "quero") {
        return "quero assistir";
    }

    return status;
}

const estrelas = (nota) => {
    let resultado = "";

    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }

    return resultado;
};

const filmesIniciais = [
    {
        id: 1,
        titulo: "Final Destination",
        ano: 2000,
        genero: "Terror",
        poster: "assets/finaldestination.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 2,
        titulo: "The Evil Dead",
        ano: 1981,
        genero: "Terror",
        poster: "assets/theevildead.jpg",
        nota: 4,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "The Babysitter",
        ano: 2017,
        genero: "Terror",
        poster: "assets/thebabysitter.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 4,
        titulo: "Scream 4",
        ano: 2011,
        genero: "Terror",
        poster: "assets/scream4.webp",
        nota: 5,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "X",
        ano: 2022,
        genero: "Terror",
        poster: "assets/x.jpg",
        nota: 5,
        status: "assistido",
        comentario: ""
    },
    {
        id: 6,
        titulo: "Friday the 13th",
        ano: 1980,
        genero: "Terror",
        poster: "assets/fridaythe13.jpg",
        nota: 5,
        status: "quero",
        comentario: ""
    }
];

function renderizarCards(lista) {
    const container = document.querySelector("#lista");

    container.innerHTML = lista.map(filme => `
        <article class="card" data-id="${filme.id}">
            <img src="${filme.poster}" alt="Pôster do filme ${filme.titulo}">

            <h2>${filme.titulo}</h2>

            <p>${filme.ano} &middot; ${filme.genero}</p>

            <p class="nota">Nota: ${estrelas(filme.nota)}</p>

            <span class="badge ${filme.status}">
                ${rotuloStatus(filme.status)}
            </span>

            <div class="acoes">
                <button type="button">Editar</button>
                <button type="button">Remover</button>
            </div>
        </article>
    `).join("");
}

renderizarCards(filmesIniciais);
const TOTAL = filmesIniciais.length;
const rodape = document.querySelector("footer small");
rodape.textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;