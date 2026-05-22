# INSTRUCTIONS

## Projeto escolhido
**Libris** — gerenciador de biblioteca pessoal com integração à Google Books API.

## Pré-requisitos

- Node.js 18+
- npm ou pnpm

## Instalação

```bash
git clone https://github.com/mateushedp/react-frontend-challenge
cd react-frontend-challenge/libris2
npm install
```

## Variáveis de ambiente

Crie um `.env` na raiz baseado no `.env.example`:

```bash
cp .env.example .env
```

A aplicação funciona sem chave de API — a Google Books API permite requisições públicas sem autenticação. Para evitar rate limiting, você pode adicionar uma chave gratuita do Google Cloud Console:
```
VITE_GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1
VITE_GOOGLE_BOOKS_API_KEY=sua_chave_aqui
```

## Rodando o projeto

```bash
npm run dev
```

Acesse `http://localhost:5173`.

## Credenciais de acesso

A autenticação é simulada. Use qualquer combinação válida:

- **Email**: qualquer email válido (ex: `user@email.com`)
- **Senha**: qualquer senha com no mínimo 6 caracteres

## Testes

```bash
npm run test
```
