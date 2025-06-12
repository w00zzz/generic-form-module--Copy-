import * as path from "path";

import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    base: process.env.ENV_URL,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 8080,
    },
    preview: {
      port: 8080,
    },
    envPrefix: "ENV_",
  });
};
