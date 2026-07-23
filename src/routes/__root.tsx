import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { MantineProvider, ColorSchemeScript, Button, Stack, Text, Title } from "@mantine/core";
import { Notifications } from "@mantine/notifications";


// Mantine core styles (order matters: core first, then addons)
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";

import { theme } from "../theme";

function NotFoundComponent() {
  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Title order={1}>404</Title>
      <Text c="dimmed">Página não encontrada.</Text>
      <Button component="a" href="/">
        Voltar ao início
      </Button>
    </Stack>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack align="center" justify="center" mih="100vh" p="md">
      <Title order={2}>Ocorreu um erro</Title>
      <Text c="dimmed">Tente novamente ou volte para a página inicial.</Text>
      <Button
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Tentar novamente
      </Button>
    </Stack>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Editor de Documentos — Protótipo Mantine" },
      {
        name: "description",
        content:
          "Protótipo de editor de documentos com preview ao vivo construído sobre Mantine v9.",
      },
      { property: "og:title", content: "Editor de Documentos — Protótipo Mantine" },
      {
        property: "og:description",
        content: "Editor com preview ao vivo, formulários acessíveis e exportação em PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications position="top-right" />
        <Outlet />
      </MantineProvider>
    </QueryClientProvider>
  );
}
