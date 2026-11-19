
import { filmesIniciais } from "./data/filmes";

export async function listar() {
  // Simula o tempo de resposta de uma API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Descomente a linha abaixo para simular uma falha:
  // throw new Error("Falha ao carregar os filmes.");

  return filmesIniciais.map((filme) => ({ ...filme }));
}
