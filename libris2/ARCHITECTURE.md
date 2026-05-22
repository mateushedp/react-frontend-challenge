# ARCHITECTURE

## Projeto escolhido
Libris — gerenciador de biblioteca pessoal com integração à Google Books API.

## Estrutura de pastas

A estrutura segue uma arquitetura modular inspirada no Feature-Sliced Design, adaptada ao escopo do projeto:

- `app/` — configuração global: layouts e providers (TanStack Query, Router)
- `pages/` — cada página orquestra features e widgets, sem lógica própria
- `features/` — funcionalidades isoladas por domínio (auth, search, shelf, theme)
- `entities/` — modelos de domínio com adapters e stores (book, shelf)
- `widgets/` — componentes compostos reutilizáveis (sidebar, search-filters)
- `shared/` — hooks, utilitários e componentes sem regra de negócio
- `components/ui/` — componentes do Shadcn/ui

Manter `entities` separado de `features` foi uma decisão consciente: regras de domínio não devem vazar pra camada de UI.

## Gerenciamento de estado

- **Server state**: TanStack Query — cache, revalidação e estados de loading/error das requisições à API
- **Client state**: Zustand — dois stores independentes:
  - `useAuthStore` — token de autenticação com persistência
  - `useShelfStore` — livros salvos pelo usuário com persistência

## Autenticação simulada

Sem backend, a autenticação funciona assim:

1. Email e senha são validados via Zod (email válido, senha com no mínimo 6 caracteres)
2. Ao submeter, um token fictício é gerado via `btoa(email + timestamp)`
3. O token é persistido no `localStorage` via middleware `persist` do Zustand (chave `libris-auth`)
4. A sessão sobrevive ao refresh — o `beforeLoad` em um layout protegido (`protectedLayout`) cobre todas as rotas filhas de uma vez, evitando repetição por rota

## Padrão Adapter

Os dados da Google Books API chegam aninhados e inconsistentes. O `adaptGoogleBook` em `entities/book/adapter.ts` transforma o volume bruto em uma interface `Book` limpa, com fallbacks para campos ausentes, formatação de data via `date-fns` e normalização de thumbnails de `http` para `https`.

## Desafios com a Google Books API

- **Ordenação**: a API não garante que o título exato pesquisado apareça primeiro — o ranking é controlado pelo algoritmo do Google
- **Dados inconsistentes**: muitos volumes não têm thumbnail, sinopse, ISBN ou data de publicação — todos tratados no adapter com fallbacks explícitos
- **Rate limiting**: o input de busca usa debounce de 500ms para reduzir chamadas durante a digitação
- **URLs inseguras**: thumbnails com `http://` são normalizados para `https://` no adapter para evitar bloqueios de mixed content

## Decisões técnicas

- **TanStack Router** — tipagem de rotas em tempo de compilação e suporte nativo a guards via `beforeLoad` em layout protegido, cobrindo todas as rotas filhas de uma vez
- **TanStack Table** — ordenação por título e status na estante usando a API nativa da lib
- **TanStack Form + Zod** — validação declarativa no login com mensagens de erro por campo
- **Shadcn/ui** — componentes acessíveis e customizáveis sem overhead de uma lib fechada
- **Zustand persist** — escolhido pela simplicidade, performance e suporte nativo a persistência
- **Debounce** — implementado via hook genérico `useDebounce<T>` em `shared/hooks`, reutilizável em qualquer input