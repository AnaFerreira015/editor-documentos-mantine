# Editor de Documentos — Protótipo Mantine

Protótipo de demonstração para avaliar a biblioteca de componentes **Mantine (v9)** com **React + TypeScript**.

## O que o protótipo mostra

- **Editor com preview ao vivo** (`/`): layout de duas colunas com o `Splitter` nativo do Mantine. À esquerda, um formulário (`@mantine/form`) com título, autor, categoria, data, tags e um editor de texto rico (`@mantine/tiptap`). À direita, o preview do documento montado a partir dos dados, atualizando a cada edição. Botão **Exportar PDF** via impressão do preview.
- **Vitrine de componentes** (`/componentes`): `Table`, `Badge`, `Select`, `Tabs`, `Modal`, `Notification`, `Card` e `Alert`, para demonstrar variedade.
- **Tema trocável**: toda a identidade visual vem do tema do Mantine (`src/theme.ts`), via CSS variables. Nenhum valor visual (cor, espaçamento, fonte) é escrito direto nos componentes — a ideia é que um Design System externo entre por tema, não por reescrita.
- **Acessibilidade**: `aria-label` em botões só com ícone, erros de formulário associados aos campos, ordem de foco coerente no layout de duas colunas, HTML semântico e `lang="pt-BR"`.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build) sobre **TanStack Start** (SSR) e **TanStack Router**
- **Mantine v9** como única biblioteca de componentes (`@mantine/core`, `@mantine/hooks`, `@mantine/form`, `@mantine/dates`, `@mantine/tiptap`, `@mantine/notifications`)
- **Tiptap 3** como base do editor de texto rico
- **@tabler/icons-react** para ícones
- **react-to-print** para a exportação em PDF do preview
- **Vitest** + **Testing Library** (jsdom) para os testes

## Pré-requisitos

- Node.js 20+ (ou Bun)
- npm, pnpm ou bun

## Como executar

Instalar as dependências:

```sh
npm install
```

Rodar em modo de desenvolvimento (por padrão em `http://localhost:5173`):

```sh
npm run dev
```

Gerar o build de produção:

```sh
npm run build
```

Servir o build gerado:

```sh
npm run preview
```

## Como rodar os testes

Os testes usam Vitest com Testing Library e seguem um padrão de acessibilidade: as queries buscam elementos por papel (`getByRole`) e nome acessível, não por classe ou `test-id`. O arquivo `src/test/DocumentoForm.test.tsx` serve de referência do padrão a seguir.

Rodar uma vez:

```sh
npm test
```

Rodar em modo observação (re-executa ao salvar):

```sh
npm run test:watch
```

## Estrutura

```
src/
  components/
    editor/         # tela do editor, formulário, preview e editor de corpo
    componentes/    # vitrine de componentes Mantine
  routes/           # rotas do TanStack Router (/ e /componentes)
  mocks/            # dados de exemplo em pt-BR
  test/             # setup e teste de exemplo (Vitest + Testing Library)
  theme.ts          # tema do Mantine (identidade visual trocável)
```

## Observações

- A **exportação em PDF** deste protótipo imprime o HTML do preview (via `react-to-print`). 
