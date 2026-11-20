
const API_URL = "http://localhost:3000/filmes";

async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers
    }
  });

  if (!resposta.ok) {
    let mensagem = "Erro ao comunicar com a API.";
    try {
      const dados = await resposta.json();
      mensagem = dados.erro || mensagem;
    } catch {
      // Algumas respostas, como 204, não possuem corpo JSON.
    }
    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

export async function listar() {
  return requisicao(API_URL);
}

export async function criar(filme) {
  return requisicao(API_URL, {
    method: "POST",
    body: JSON.stringify(filme)
  });
}

export async function atualizar(id, filme) {
  return requisicao(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(filme)
  });
}

export async function remover(id) {
  return requisicao(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
