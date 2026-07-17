import { useForm } from "@mantine/form";
import {
  Stack,
  TextInput,
  Select,
  TagsInput,
  Group,
  Text,
  Fieldset,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect } from "react";
import {
  CATEGORIAS,
  TAGS_SUGERIDAS,
  type DocumentoInicial,
} from "../../mocks/documentos";
import { CorpoEditor } from "./CorpoEditor";

interface DocumentoFormProps {
  inicial: DocumentoInicial;
  onChange: (dados: DocumentoInicial) => void;
}

export function DocumentoForm({ inicial, onChange }: DocumentoFormProps) {
  const form = useForm<DocumentoInicial>({
    mode: "controlled",
    initialValues: inicial,
    validate: {
      titulo: (v) => (v.trim().length < 3 ? "O título precisa ter ao menos 3 caracteres." : null),
      autor: (v) => (v.trim().length === 0 ? "Informe o nome do(a) autor(a)." : null),
      categoria: (v) => (!v ? "Selecione uma categoria." : null),
    },
  });

  useEffect(() => {
    onChange(form.values);
  }, [form.values, onChange]);

  return (
    <form aria-label="Formulário de edição do documento" noValidate>
      <Stack gap="md">
        <Fieldset legend="Metadados" variant="unstyled">
          <Stack gap="sm">
            <TextInput
              label="Título"
              placeholder="Ex.: Diretrizes de acessibilidade"
              withAsterisk
              {...form.getInputProps("titulo")}
            />
            <TextInput
              label="Autor(a)"
              placeholder="Nome completo"
              withAsterisk
              {...form.getInputProps("autor")}
            />
            <Group grow align="flex-start">
              <Select
                label="Categoria"
                placeholder="Selecione…"
                data={CATEGORIAS}
                withAsterisk
                {...form.getInputProps("categoria")}
              />
              <DatePickerInput
                label="Data de publicação"
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={16} aria-hidden />}
                {...form.getInputProps("data")}
              />
            </Group>
            <TagsInput
              label="Tags"
              placeholder="Adicione tags e pressione Enter"
              data={TAGS_SUGERIDAS}
              clearable
              {...form.getInputProps("tags")}
            />
          </Stack>
        </Fieldset>

        <Fieldset legend="Conteúdo" variant="unstyled">
          <Stack gap={4}>
            <Text component="label" htmlFor="corpo-editor" size="sm" fw={500}>
              Corpo do documento
            </Text>
            <div id="corpo-editor">
              <CorpoEditor
                value={form.values.corpoHTML}
                onChange={(html) => form.setFieldValue("corpoHTML", html)}
              />
            </div>
          </Stack>
        </Fieldset>
      </Stack>
    </form>
  );
}
