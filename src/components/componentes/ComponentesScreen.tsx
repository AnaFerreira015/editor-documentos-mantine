import { useState } from "react";
import {
  AppShell,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
  Alert,
} from "@mantine/core";
import { IconArrowLeft, IconInfoCircle, IconSparkles } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";

import { CATEGORIAS, linhasTabela } from "../../mocks/documentos";

const statusColor: Record<string, string> = {
  Publicado: "petrol",
  "Em revisão": "yellow",
  Rascunho: "gray",
};

export function ComponentesScreen() {
  const [modalAberto, setModalAberto] = useState(false);
  const [categoria, setCategoria] = useState<string | null>(null);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={1} size="h4">
            Componentes
          </Title>
          <Button
            component={Link}
            to="/"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} aria-hidden />}
          >
            Voltar ao editor
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Stack gap="lg" maw={1100} mx="auto">
          <Alert icon={<IconInfoCircle aria-hidden />} title="Sobre esta tela" color="petrol">
            Demonstração de componentes Mantine estilizados exclusivamente pelo tema global.
          </Alert>

          <Tabs defaultValue="tabela" aria-label="Categorias de demonstração">
            <Tabs.List>
              <Tabs.Tab value="tabela">Tabela</Tabs.Tab>
              <Tabs.Tab value="formulario">Formulário</Tabs.Tab>
              <Tabs.Tab value="cards">Cards</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tabela" pt="md">
              <Card withBorder radius="md" padding="lg">
                <Table.ScrollContainer minWidth={500}>
                <Table
                  striped
                  highlightOnHover
                  withTableBorder
                  aria-label="Documentos recentes"
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Documento</Table.Th>
                      <Table.Th>Autor(a)</Table.Th>
                      <Table.Th>Categoria</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Atualizado</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {linhasTabela.map((linha) => (
                      <Table.Tr key={linha.id}>
                        <Table.Td>{linha.documento}</Table.Td>
                        <Table.Td>{linha.autor}</Table.Td>
                        <Table.Td>{linha.categoria}</Table.Td>
                        <Table.Td>
                          <Badge color={statusColor[linha.status]} variant="light">
                            {linha.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td>{linha.atualizadoEm}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
                </Table.ScrollContainer>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="formulario" pt="md">
              <Card withBorder radius="md" padding="lg">
                <Stack gap="md">
                  <Select
                    label="Categoria"
                    placeholder="Selecione…"
                    data={CATEGORIAS}
                    value={categoria}
                    onChange={setCategoria}
                  />
                  <Group>
                    <Button onClick={() => setModalAberto(true)}>Abrir modal</Button>
                    <Button
                      variant="light"
                      leftSection={<IconSparkles size={16} aria-hidden />}
                      onClick={() =>
                        notifications.show({
                          title: "Notificação de exemplo",
                          message: "Componentes Mantine em ação.",
                          color: "petrol",
                        })
                      }
                    >
                      Disparar notificação
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="cards" pt="md">
              <Group align="stretch" grow>
                {[
                  { titulo: "Acessibilidade", texto: "Componentes com foco em navegação por teclado." },
                  { titulo: "Tema global", texto: "Cores, raio e tipografia definidos em um único lugar." },
                  { titulo: "Composição", texto: "APIs consistentes entre inputs, feedback e layout." },
                ].map((c) => (
                  <Card key={c.titulo} withBorder radius="md" padding="lg">
                    <Title order={2} size="h5">
                      {c.titulo}
                    </Title>
                    <Text mt="xs" c="dimmed" size="sm">
                      {c.texto}
                    </Text>
                    <Badge mt="md" variant="light">
                      Mantine v9
                    </Badge>
                  </Card>
                ))}
              </Group>
            </Tabs.Panel>
          </Tabs>
        </Stack>

        <Modal
          opened={modalAberto}
          onClose={() => setModalAberto(false)}
          title="Modal de exemplo"
          centered
        >
          <Text size="sm">
            Este é um modal Mantine com foco preso automaticamente e fechamento por{" "}
            <kbd>Esc</kbd>.
          </Text>
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}
