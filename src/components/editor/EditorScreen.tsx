import { useRef, useState, useCallback } from "react";
import {
  AppShell,
  Button,
  Group,
  Title,
  ScrollArea,
  Box,
  Text,
  Splitter,
} from "@mantine/core";
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
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <IconFileText size={22} aria-hidden />
            <Title order={1} size="h4">
              Editor de Documentos
            </Title>
          </Group>
          <Group gap="sm">
            <Button
              component={Link}
              to="/componentes"
              variant="subtle"
              leftSection={<IconComponents size={16} aria-hidden />}
            >
              Componentes
            </Button>
            <Button
              onClick={() => exportarPDF()}
              leftSection={<IconFileTypePdf size={16} aria-hidden />}
              aria-label="Exportar preview como PDF"
            >
              Exportar PDF
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
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
      </AppShell.Main>
    </AppShell>
  );
}
