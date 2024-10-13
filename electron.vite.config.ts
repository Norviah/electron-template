import react from '@vitejs/plugin-react';

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'node:path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: { 
        entry: "src/main/preload.ts"
      },
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [TanStackRouterVite({
      routesDirectory: "./src/renderer/routes",
      generatedRouteTree: "./src/renderer/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single" 
    }), react()]
  }
})
