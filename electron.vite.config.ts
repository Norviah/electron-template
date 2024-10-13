import react from '@vitejs/plugin-react';

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'node:path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "out/main",
      lib: {
        entry: "src/backend/index.ts"
      },
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: { 
        entry: "src/backend/preload.ts"
      },
    }
  },
  renderer: {
    root: "src/frontend",
    resolve: {
      alias: {
        '@frontend': resolve('src/frontend')
      }
    },
    build: {
      outDir: "out/renderer",
      rollupOptions: {
        input: "./src/frontend/index.html"
      }
    },
    plugins: [TanStackRouterVite({
      routesDirectory: "./src/frontend/routes",
      generatedRouteTree: "./src/frontend/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single" 
    }), react()]
  }
})
