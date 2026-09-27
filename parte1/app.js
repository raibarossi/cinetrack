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

const primeiroCard = document.querySelector(".card");
const badge = primeiroCard.querySelector(".badge");
const nota = primeiroCard.querySelector(".nota");
badge.textContent = rotuloStatus("assistido");
nota.textContent = `Nota: ${estrelas(5)}`;
const TOTAL = 6;
const rodape = document.querySelector("footer small");
rodape.textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;