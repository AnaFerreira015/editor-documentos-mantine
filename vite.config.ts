import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Redireciona o server entry do TanStack Start para src/server.ts (wrapper de erro SSR).
      server: { entry: "server" },
    }),
    react(),
  ],
});
