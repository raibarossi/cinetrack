# CineTrack

Aplicação web para organizar filmes, acompanhar o status de visualização e registrar notas e comentários.

O projeto foi desenvolvido em etapas, evoluindo de uma aplicação HTML, CSS e JavaScript para uma aplicação React integrada a uma API REST.

## Funcionalidades

- Listagem de filmes com pôster, ano, gênero, nota e status.
- Adição, edição e remoção de filmes.
- Filtros por status.
- Busca por título ou gênero.
- Persistência dos dados no backend em arquivo JSON.
- Integração entre frontend e backend por meio de requisições HTTP.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Node.js
- Express
- API REST
- Fetch API
- JSON

## Estrutura do projeto

- `parte1/`: versão original desenvolvida com HTML, CSS e JavaScript.
- `frontend/`: aplicação desenvolvida com React e Vite.
- `backend/`: API REST desenvolvida com Node.js e Express.

## Como executar a versão original

1. Abra a pasta `parte1` no Visual Studio Code.
2. Abra o arquivo `index.html` no navegador ou utilize a extensão Live Server.
3. Use os filtros, a busca e o formulário para gerenciar os filmes.

## Como rodar o backend

1. Abra um terminal na pasta `backend`:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com a porta do servidor:

   ```env
   PORT=3000
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

O backend estará disponível em `http://localhost:3000`.

A API disponibiliza as operações de consulta, cadastro, atualização e remoção de filmes pela rota `/filmes`.

## Como rodar o frontend

1. Abra outro terminal na pasta `frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação:

   ```bash
   npm run dev
   ```

4. Acesse o endereço disponibilizado pelo Vite, geralmente `http://localhost:5173`.

**Importante:** o backend precisa estar em execução para que o frontend consiga consultar e modificar os filmes.

## Build do frontend

Para gerar a versão de produção da aplicação, execute dentro da pasta `frontend`:

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `frontend/dist`.

## Persistência

Na versão original (`parte1`), os filmes são armazenados no navegador com a chave `cinetrack:filmes`, utilizando a API `localStorage`.

Na versão React, os dados são consultados e persistidos pelo backend no arquivo `backend/data/filmes.json`.

## Versão

**v2.0** — Integração do frontend React com a API REST, utilizando operações reais de consulta, cadastro, atualização e remoção de filmes.