import { createFileRoute } from "@tanstack/react-router";
import { ComponentesScreen } from "../components/componentes/ComponentesScreen";

export const Route = createFileRoute("/componentes")({
  head: () => ({
    meta: [
      { title: "Componentes — Protótipo Mantine" },
      {
        name: "description",
        content: "Vitrine de componentes Mantine: Table, Badge, Tabs, Modal, Notification, Card.",
      },
      { property: "og:title", content: "Componentes — Protótipo Mantine" },
      {
        property: "og:description",
        content: "Vitrine de componentes Mantine estilizados via tema global.",
      },
    ],
  }),
  component: ComponentesScreen,
});
