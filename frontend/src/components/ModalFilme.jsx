
import { useState } from "react";

function ModalFilme({ filme, onSalvar, onFechar }) {
  const [formulario, setFormulario] = useState(() => ({
    titulo: filme?.titulo || "",
    ano: filme?.ano || "",
    genero: filme?.genero || "",
    poster: filme?.poster || "",
    nota: filme?.nota ?? 0,
    status: filme?.status || "quero",
    comentario: filme?.comentario || ""
  }));

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value
    }));
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    const filmePronto = {
      ...formulario,
      ano: Number(formulario.ano),
      nota: Number(formulario.nota)
    };

    onSalvar(filmePronto);
  }

  return (
    <div className="modal">
      <form onSubmit={enviarFormulario}>
        <h2>{filme ? "Editar filme" : "Adicionar filme"}</h2>

        <label>
          Título
          <input
            name="titulo"
            value={formulario.titulo}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label>
          Ano
          <input
            name="ano"
            type="number"
            value={formulario.ano}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label>
          Gênero
          <input
            name="genero"
            value={formulario.genero}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label>
          URL do pôster
          <input
            name="poster"
            value={formulario.poster}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Nota
          <input
            name="nota"
            type="number"
            min="0"
            max="5"
            value={formulario.nota}
            onChange={atualizarCampo}
          />
        </label>

        <label>
          Status
          <select
            name="status"
            value={formulario.status}
            onChange={atualizarCampo}
          >
            <option value="assistido">Assistido</option>
            <option value="assistindo">Assistindo</option>
            <option value="quero">Quero assistir</option>
          </select>
        </label>

        <label>
          Comentário
          <textarea
            name="comentario"
            value={formulario.comentario}
            onChange={atualizarCampo}
          />
        </label>

        <button type="submit">Salvar</button>
        <button type="button" onClick={onFechar}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ModalFilme;
