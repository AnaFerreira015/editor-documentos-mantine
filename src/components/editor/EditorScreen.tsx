import { useRef, useState, useCallback } from "react";
import {
  AppShell,
  Button,
  Group,
  Title,
  ScrollArea,
  Box,
  Stack,
  Text,
  Splitter,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconFileTypePdf, IconComponents, IconFileText } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useReactToPrint } from "react-to-print";
import { notifications } from "@mantine/notifications";

import { DocumentoForm } from "./DocumentoForm";
import { DocumentoPreview } from "./DocumentoPreview";
import { documentoExemplo, type DocumentoInicial } from "../../mocks/documentos";

export function EditorScreen() {
  const [dados, setDados] = useState<DocumentoInicial>(documentoExemplo);
  const previewRef = useRef<HTMLElement>(null);

  // Abaixo de 768px o layout lado a lado não cabe: empilha as áreas verticalmente.
  const empilhado = useMediaQuery("(max-width: 768px)");

  const handleChange = useCallback((novo: DocumentoInicial) => setDados(novo), []);

  const exportarPDF = useReactToPrint({
    contentRef: previewRef,
    documentTitle: dados.titulo || "documento",
    onAfterPrint: () =>
      notifications.show({
        title: "Exportação concluída",
        message: "O PDF foi gerado com sucesso.",
        color: "petrol",
      }),
  });

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <IconFileText size={22} aria-hidden />
            <Title order={1} size={empilhado ? "h5" : "h4"} lineClamp={1}>
              Editor de Documentos
            </Title>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <Button
              component={Link}
              to="/componentes"
              variant="subtle"
              leftSection={!empilhado ? <IconComponents size={16} aria-hidden /> : undefined}
              px={empilhado ? "xs" : undefined}
              aria-label="Ver componentes"
            >
              {empilhado ? <IconComponents size={18} aria-hidden /> : "Componentes"}
            </Button>
            <Button
              onClick={() => exportarPDF()}
              leftSection={!empilhado ? <IconFileTypePdf size={16} aria-hidden /> : undefined}
              px={empilhado ? "xs" : undefined}
              aria-label="Exportar preview como PDF"
            >
              {empilhado ? <IconFileTypePdf size={18} aria-hidden /> : "Exportar PDF"}
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {empilhado ? (
          <Stack gap="lg">
            <Box component="section" aria-label="Área de edição">
              <DocumentoForm inicial={documentoExemplo} onChange={handleChange} />
            </Box>
            <Box component="section" aria-label="Área de pré-visualização">
              <Text size="xs" c="dimmed" mb="xs" tt="uppercase" fw={600}>
                Pré-visualização ao vivo
              </Text>
              <DocumentoPreview dados={dados} ref={previewRef} />
            </Box>
          </Stack>
        ) : (
          <Splitter h="calc(100vh - 92px)" aria-label="Editor e pré-visualização">
            <Splitter.Pane defaultSize="50%" min="25%">
              <ScrollArea h="100%" type="auto">
                <Box p="md" component="section" aria-label="Área de edição">
                  <DocumentoForm inicial={documentoExemplo} onChange={handleChange} />
                </Box>
              </ScrollArea>
            </Splitter.Pane>
            <Splitter.Pane defaultSize="50%" min="25%">
              <ScrollArea h="100%" type="auto">
                <Box p="md" component="section" aria-label="Área de pré-visualização">
                  <Text size="xs" c="dimmed" mb="xs" tt="uppercase" fw={600}>
                    Pré-visualização ao vivo
                  </Text>
                  <DocumentoPreview dados={dados} ref={previewRef} />
                </Box>
              </ScrollArea>
            </Splitter.Pane>
          </Splitter>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
