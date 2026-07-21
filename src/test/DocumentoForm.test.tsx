import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";

import { DocumentoForm } from "../components/editor/DocumentoForm";
import { documentoExemplo } from "../mocks/documentos";

/**
 * Exemplo do padrão de teste acessível a seguir:
 * - queries por `role` e `name` acessível
 * - simulação de interação real via `userEvent`
 * - validação exposta ao leitor de tela
 */

function renderForm() {
  const onChange = vi.fn();
  render(
    <MantineProvider>
      <DocumentoForm inicial={documentoExemplo} onChange={onChange} />
    </MantineProvider>,
  );
  return { onChange };
}

describe("DocumentoForm", () => {
  it("expõe o campo de título com o rótulo acessível", () => {
    renderForm();
    expect(screen.getByRole("textbox", { name: /título/i })).toBeInTheDocument();
  });

  it("permite editar o autor e propaga a mudança", async () => {
    const user = userEvent.setup();
    const { onChange } = renderForm();

    const autor = screen.getByRole("textbox", { name: /autor/i });
    await user.clear(autor);
    await user.type(autor, "Ana Beatriz");

    expect(onChange).toHaveBeenCalled();
    expect(autor).toHaveValue("Ana Beatriz");
  });

  it("possui landmark de formulário rotulado", () => {
    renderForm();
    expect(
      screen.getByRole("form", { name: /formulário de edição do documento/i }),
    ).toBeInTheDocument();
  });
});
