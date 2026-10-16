function rotuloStatus(status) {
    if (status === "assistido") return "assistido";
    if (status === "assistindo") return "assistindo";
    if (status === "quero") return "quero assistir";

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

const CHAVE_STORAGE = "cinetrack:filmes";

// Carrega os filmes salvos no navegador.
// Na primeira visita, utiliza os filmes iniciais.
function carregar() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (dados !== null) {
            const filmesSalvos = JSON.parse(dados);

            if (Array.isArray(filmesSalvos)) {
                return filmesSalvos;
            }
        }
    } catch (erro) {
        console.error("Não foi possível carregar os filmes:", erro);
    }

    return filmesIniciais.map(filme => ({ ...filme }));
}

// Salva o array atual no navegador.
function salvar() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes));
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar os filmes:", erro);
        alert("Não foi possível salvar os dados neste navegador.");
        return false;
    }
}

let filmes = carregar();
let statusAtual = "todos";
let editandoId = null;

const lista = document.querySelector("#lista");
const busca = document.querySelector("#busca");
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const tituloModal = document.querySelector("#modal-titulo");
const errosForm = document.querySelector("#erros-form");
const botoesFiltro = document.querySelectorAll("nav button[data-status]");

// Cria um elemento sem inserir dados como HTML.
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
    poster.src = filme.poster || "";
    poster.alt = `Pôster do filme ${filme.titulo}`;
    poster.loading = "lazy";

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

    article.appendChild(
        criarElementoTexto(
            "span",
            `badge ${filme.status}`,
            rotuloStatus(filme.status)
        )
    );

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";
    btnEditar.setAttribute("aria-label", `Editar ${filme.titulo}`);

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";
    btnRemover.setAttribute("aria-label", `Remover ${filme.titulo}`);

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

// Aplica busca e filtro de status juntos.
function aplicarFiltros() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

    return filmes.filter(filme => {
        const correspondeStatus =
            statusAtual === "todos" ||
            filme.status === statusAtual;

        const correspondeBusca =
            filme.titulo.toLocaleLowerCase("pt-BR").includes(termo) ||
            filme.genero.toLocaleLowerCase("pt-BR").includes(termo);

        return correspondeStatus && correspondeBusca;
    });
}

// Atualiza a lista visível e o rodapé.
function atualizar() {
    renderizarCards(aplicarFiltros());
    atualizarRodape();
}

function atualizarRodape() {
    const rodape = document.querySelector("footer small");

    rodape.textContent =
        `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

// Validação pura: recebe os dados e devolve os erros.
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

    if (filme.poster) {
        try {
            const url = new URL(filme.poster);

            if (url.protocol !== "http:" && url.protocol !== "https:") {
                erros.push("A URL do pôster deve começar com http:// ou https://.");
            }
        } catch {
            erros.push("Informe uma URL válida para o pôster.");
        }
    }

    return erros;
}

function mostrarErros(erros) {
    errosForm.replaceChildren();
    errosForm.hidden = erros.length === 0;

    if (erros.length === 0) {
        return;
    }

    const fragmento = document.createDocumentFragment();

    erros.forEach(erro => {
        fragmento.appendChild(
            criarElementoTexto("p", "", erro)
        );
    });

    errosForm.appendChild(fragmento);
}

// Abre o modal para adicionar.
function abrir() {
    form.reset();
    editandoId = null;

    mostrarErros([]);
    tituloModal.textContent = "Adicionar filme";
    modal.hidden = false;

    document.querySelector("#titulo-modal").focus();
}

// Fecha o modal.
function fechar() {
    modal.hidden = true;
    form.reset();
    editandoId = null;

    mostrarErros([]);
}

function gerarId() {
    if (filmes.length === 0) {
        return 1;
    }

    return Math.max(...filmes.map(filme => filme.id)) + 1;
}

// Preenche o modal para edição.
function editarFilme(id) {
    const filme = filmes.find(item => item.id === id);

    if (!filme) return;

    abrir();

    editandoId = filme.id;
    tituloModal.textContent = "Editar filme";

    form.elements.titulo.value = filme.titulo;
    form.elements.ano.value = filme.ano;
    form.elements.genero.value = filme.genero;
    form.elements.poster.value = filme.poster;
    form.elements.status.value = filme.status;
    form.elements.nota.value = filme.nota;
    form.elements.comentario.value = filme.comentario || "";
}

// Aguarda 300 ms após a última digitação.
function debounce(funcao, atraso) {
    let temporizador;

    return function (...argumentos) {
        clearTimeout(temporizador);

        temporizador = setTimeout(() => {
            funcao.apply(this, argumentos);
        }, atraso);
    };
}

function aoDigitar() {
    atualizar();
}

// Botão de adicionar.
document.querySelector("#btn-adicionar").addEventListener("click", abrir);

// Botão de cancelar.
document.querySelector("#btn-cancelar").addEventListener("click", fechar);

// Tecla Escape fecha o modal.
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !modal.hidden) {
        fechar();
    }
});

// Fecha ao clicar fora do conteúdo do modal.
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        fechar();
    }
});

// Busca com debounce de 300 ms.
busca.addEventListener("input", debounce(aoDigitar, 300));

// Filtros de status.
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function() {
        botoesFiltro.forEach(item => {
            item.classList.remove("ativo");
            item.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("ativo");
        botao.setAttribute("aria-pressed", "true");

        statusAtual = botao.dataset.status;

        atualizar();
    });
});

// Delegação dos botões Editar e Remover.
lista.addEventListener("click", function(event) {
    const botaoEditar = event.target.closest(".btn-editar");
    const botaoRemover = event.target.closest(".btn-remover");

    if (botaoEditar) {
        const card = botaoEditar.closest(".card");
        editarFilme(Number(card.dataset.id));
        return;
    }

    if (botaoRemover) {
        const card = botaoRemover.closest(".card");
        const id = Number(card.dataset.id);

        if (!confirm("Deseja remover este filme?")) {
            return;
        }

        filmes = filmes.filter(filme => filme.id !== id);

        salvar();
        atualizar();
    }
});

// Adiciona ou edita um filme.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = Object.fromEntries(
        new FormData(form).entries()
    );

    const filme = {
        titulo: dados.titulo.trim(),
        ano: Number(dados.ano),
        genero: dados.genero.trim(),
        poster: dados.poster.trim(),
        nota: Number(dados.nota),
        status: dados.status,
        comentario: dados.comentario.trim()
    };

    const erros = validarFilme(filme);
    mostrarErros(erros);

    if (erros.length > 0) {
        return;
    }

    if (editandoId === null) {
        filmes.push({
            id: gerarId(),
            ...filme
        });
    } else {
        filmes = filmes.map(item =>
            item.id === editandoId
                ? { ...item, ...filme, id: item.id }
                : item
        );
    }

    salvar();
    atualizar();
    fechar();
});

// Inicializa a página com os dados persistidos.
atualizar();