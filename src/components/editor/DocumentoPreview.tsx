import { forwardRef } from "react";
import { Badge, Group, Paper, Stack, Text, Title, Divider } from "@mantine/core";
import type { DocumentoInicial } from "../../mocks/documentos";
import { CATEGORIAS } from "../../mocks/documentos";

interface DocumentoPreviewProps {
  dados: DocumentoInicial;
}

const formatarData = (data: Date) =>
  data instanceof Date && !isNaN(data.getTime())
    ? data.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

export const DocumentoPreview = forwardRef<HTMLElement, DocumentoPreviewProps>(
  function DocumentoPreview({ dados }, ref) {
    const categoria =
      CATEGORIAS.find((c) => c.value === dados.categoria)?.label ?? dados.categoria;

    return (
      <Paper
        component="article"
        ref={ref}
        p="xl"
        radius="md"
        withBorder
        shadow="xs"
        aria-label="Pré-visualização do documento"
      >
        <Stack gap="md">
          <Stack gap={4}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              {categoria || "Sem categoria"}
            </Text>
            <Title order={1} size="h2">
              {dados.titulo || "Documento sem título"}
            </Title>
            <Group gap="xs" mt={4}>
              <Text size="sm" c="dimmed">
                Por <strong>{dados.autor || "Autor(a) não informado(a)"}</strong>
              </Text>
              <Text size="sm" c="dimmed">
                • {formatarData(dados.data)}
              </Text>
            </Group>
          </Stack>

          {dados.tags.length > 0 && (
            <Group gap={6} role="list" aria-label="Tags do documento">
              {dados.tags.map((tag) => (
                <Badge key={tag} variant="light" role="listitem">
                  {tag}
                </Badge>
              ))}
            </Group>
          )}

          <Divider />

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: dados.corpoHTML }}
          />
        </Stack>
      </Paper>
    );
  },
);
