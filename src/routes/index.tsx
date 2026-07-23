import { createFileRoute } from "@tanstack/react-router";
import { EditorScreen } from "../components/editor/EditorScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Editor de Documentos — Protótipo Mantine" },
      {
        name: "description",
        content:
          "Edite documentos com preview ao vivo e exporte em PDF. Protótipo baseado em Mantine v9.",
      },
      { property: "og:title", content: "Editor de Documentos — Protótipo Mantine" },
      {
        property: "og:description",
        content: "Edite documentos com preview ao vivo e exporte em PDF.",
      },
    ],
  }),
  component: EditorScreen,
});
