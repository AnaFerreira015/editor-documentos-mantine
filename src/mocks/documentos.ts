// Dados fake em pt-BR para o protótipo. Sem backend.

export const CATEGORIAS = [
  { value: "artigo", label: "Artigo" },
  { value: "relatorio", label: "Relatório" },
  { value: "comunicado", label: "Comunicado interno" },
  { value: "manual", label: "Manual técnico" },
  { value: "proposta", label: "Proposta comercial" },
];

export const TAGS_SUGERIDAS = [
  "tecnologia",
  "produto",
  "design",
  "marketing",
  "financeiro",
  "jurídico",
  "recursos humanos",
];

export interface DocumentoInicial {
  titulo: string;
  autor: string;
  categoria: string;
  data: Date;
  tags: string[];
  corpoHTML: string;
}

export const documentoExemplo: DocumentoInicial = {
  titulo: "Diretrizes de acessibilidade para produtos digitais",
  autor: "Marina Cavalcanti",
  categoria: "manual",
  data: new Date(),
  tags: ["design", "produto"],
  corpoHTML:
    "<h2>Introdução</h2><p>Este documento reúne as diretrizes de acessibilidade adotadas pela equipe de produto, com foco em <strong>navegação por teclado</strong>, leitores de tela e contraste de cores.</p><p>Todo componente novo deve ser validado com os critérios <em>WCAG 2.2 AA</em> antes de ir para produção.</p><ul><li>Rotule botões apenas com ícone.</li><li>Associe mensagens de erro aos campos.</li><li>Mantenha ordem de foco previsível.</li></ul>",
};

export interface LinhaTabela {
  id: number;
  documento: string;
  autor: string;
  categoria: string;
  status: "Rascunho" | "Em revisão" | "Publicado";
  atualizadoEm: string;
}

export const linhasTabela: LinhaTabela[] = [
  {
    id: 1,
    documento: "Política de privacidade",
    autor: "Rafael Nogueira",
    categoria: "Jurídico",
    status: "Publicado",
    atualizadoEm: "12/03/2025",
  },
  {
    id: 2,
    documento: "Plano de marketing Q2",
    autor: "Bianca Toledo",
    categoria: "Marketing",
    status: "Em revisão",
    atualizadoEm: "28/03/2025",
  },
  {
    id: 3,
    documento: "Manual de identidade visual",
    autor: "Marina Cavalcanti",
    categoria: "Design",
    status: "Rascunho",
    atualizadoEm: "05/04/2025",
  },
  {
    id: 4,
    documento: "Relatório financeiro anual",
    autor: "Otávio Bastos",
    categoria: "Financeiro",
    status: "Publicado",
    atualizadoEm: "18/02/2025",
  },
];
