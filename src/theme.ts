import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Azul-petróleo (teal-blue) primary palette
const petrol: MantineColorsTuple = [
  "#e6f3f5",
  "#cbe0e3",
  "#9ec3c8",
  "#6ea4ac",
  "#488a95",
  "#2f7a86",
  "#207380",
  "#0f6270",
  "#005565",
  "#00485a",
];

export const theme = createTheme({
  primaryColor: "petrol",
  primaryShade: { light: 6, dark: 4 },
  colors: { petrol },
  defaultRadius: "md",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  headings: {
    fontWeight: "600",
  },
  cursorType: "pointer",
});
