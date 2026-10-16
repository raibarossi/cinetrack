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

let filmes = [...filmesIniciais];
let statusAtual = "todos";
let editandoId = null;

const lista = document.querySelector("#lista");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const tituloModal = document.querySelector("#modal-titulo");
const errosForm = document.querySelector("#erros-form");
const botoesFiltro = document.querySelectorAll("nav button[data-status]");

// Cria um elemento de texto com segurança.
function criarElementoTexto(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    elemento.textContent = texto;

    return elemento;
}

// Cria um card usando createElement e textContent.
function criarCard(filme) {
    const article = document.createElement("article");
    article.className = "card";
    article.dataset.id = filme.id;

    const poster = document.createElement("img");
    poster.src = filme.poster;
    poster.alt = `Pôster do filme ${filme.titulo}`;
    article.appendChild(poster);

    article.appendChild(
        criarElementoTexto("h2", "", filme.titulo)
    );

    article.appendChild(
        criarElementoTexto(
            "p",
            "",
            `${filme.ano} · ${filme.genero}`
        )
    );

    article.appendChild(
        criarElementoTexto(
            "p",
            "nota",
            `Nota: ${estrelas(filme.nota)}`
        )
    );

    const badge = criarElementoTexto(
        "span",
        `badge ${filme.status}`,
        rotuloStatus(filme.status)
    );

    article.appendChild(badge);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    acoes.appendChild(btnEditar);
    acoes.appendChild(btnRemover);

    article.appendChild(acoes);

    return article;
}

// Renderiza os cards usando DocumentFragment.
function renderizarCards(listaFilmes) {
    const fragmento = document.createDocumentFragment();

    listaFilmes.forEach(filme => {
        fragmento.appendChild(criarCard(filme));
    });

    lista.replaceChildren(fragmento);
}

// Aplica o filtro selecionado.
function atualizarLista() {
    const filtrados = statusAtual === "todos"
        ? filmes
        : filmes.filter(filme => filme.status === statusAtual);

    renderizarCards(filtrados);
}

// Atualiza a quantidade de filmes no rodapé.
function atualizarRodape() {
    const rodape = document.querySelector("footer small");

    rodape.textContent =
        `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

// Validação pura: recebe os dados e devolve uma lista de erros.
// Não altera o formulário nem o array de filmes.
function validarFilme(filme) {
    const erros = [];

    if (!filme.titulo || !filme.titulo.trim()) {
        erros.push("Informe o título do filme.");
    }

    if (
        !Number.isInteger(filme.ano) ||
        filme.ano < 1888 ||
        filme.ano > 2030
    ) {
        erros.push("Informe um ano entre 1888 e 2030.");
    }

    if (!filme.genero || !filme.genero.trim()) {
        erros.push("Informe o gênero do filme.");
    }

    const statusValidos = ["assistido", "assistindo", "quero"];

    if (!statusValidos.includes(filme.status)) {
        erros.push("Selecione um status válido.");
    }

    if (
        !Number.isInteger(filme.nota) ||
        filme.nota < 1 ||
        filme.nota > 5
    ) {
        erros.push("A nota deve ser um número inteiro entre 1 e 5.");
    }

    if (filme.poster && filme.poster.trim()) {
        try {
            new URL(filme.poster);
        } catch {
            erros.push("Informe uma URL válida para o pôster.");
        }
    }

    return erros;
}

// Mostra os erros de validação.
function mostrarErros(erros) {
    errosForm.replaceChildren();
    errosForm.hidden = erros.length === 0;

    if (erros.length === 0) {
        return;
    }

    const fragmento = document.createDocumentFragment();

    erros.forEach(erro => {
        const item = document.createElement("p");
        item.textContent = erro;
        fragmento.appendChild(item);
    });

    errosForm.appendChild(fragmento);
}

// Abre o modal para adicionar um filme.
function abrir() {
    form.reset();
    editandoId = null;

    mostrarErros([]);

    tituloModal.textContent = "Adicionar filme";
    modal.hidden = false;

    document.querySelector("#titulo-modal").focus();
}

// Fecha o modal e limpa o formulário.
function fechar() {
    modal.hidden = true;
    form.reset();
    editandoId = null;

    mostrarErros([]);
}

// Gera um ID que não está sendo utilizado.
function gerarId() {
    if (filmes.length === 0) {
        return 1;
    }

    return Math.max(...filmes.map(filme => filme.id)) + 1;
}

// Preenche o formulário para editar um filme.
function editarFilme(id) {
    const filme = filmes.find(item => item.id === id);

    if (!filme) {
        return;
    }

    abrir();

    editandoId = filme.id;
    tituloModal.textContent = "Editar filme";

    form.elements.titulo.value = filme.titulo;
    form.elements.ano.value = filme.ano;
    form.elements.genero.value = filme.genero;
    form.elements.poster.value = filme.poster;
    form.elements.status.value = filme.status;
    form.elements.nota.value = filme.nota;
    form.elements.comentario.value = filme.comentario;
}

// Botão "+ Adicionar".
document.querySelector("#btn-adicionar").addEventListener("click", abrir);

// Botão "Cancelar".
document.querySelector("#btn-cancelar").addEventListener("click", fechar);

// Fecha o modal com a tecla Escape.
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

// Delegação de eventos para Editar e Remover.
lista.addEventListener("click", function(event) {
    const botaoEditar = event.target.closest(".btn-editar");
    const botaoRemover = event.target.closest(".btn-remover");

    if (botaoEditar) {
        const card = botaoEditar.closest(".card");
        const id = Number(card.dataset.id);

        editarFilme(id);
        return;
    }

    if (botaoRemover) {
        const card = botaoRemover.closest(".card");
        const id = Number(card.dataset.id);

        const confirmar = confirm("Deseja remover este filme?");

        if (!confirmar) {
            return;
        }

        filmes = filmes.filter(filme => filme.id !== id);

        atualizarLista();
        atualizarRodape();
    }
});

// Filtros por status.
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function() {
        botoesFiltro.forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        statusAtual = botao.dataset.status;

        atualizarLista();
    });
});

// Salvar: adicionar ou editar.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dadosFormulario = Object.fromEntries(
        new FormData(form).entries()
    );

    const filme = {
        titulo: dadosFormulario.titulo.trim(),
        ano: Number(dadosFormulario.ano),
        genero: dadosFormulario.genero.trim(),
        poster: dadosFormulario.poster.trim(),
        nota: Number(dadosFormulario.nota),
        status: dadosFormulario.status,
        comentario: dadosFormulario.comentario.trim()
    };

    const erros = validarFilme(filme);

    mostrarErros(erros);

    if (erros.length > 0) {
        return;
    }

    if (editandoId === null) {
        // Adiciona um novo filme.
        filmes.push({
            id: gerarId(),
            ...filme
        });
    } else {
        // Atualiza o filme mantendo o mesmo ID.
        filmes = filmes.map(item =>
            item.id === editandoId
                ? { ...item, ...filme, id: item.id }
                : item
        );
    }

    atualizarLista();
    atualizarRodape();
    fechar();
});

// Estado inicial da página.
atualizarLista();
atualizarRodape();