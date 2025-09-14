import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

// Note: @github/spark plugins commented out as package is not available
// import sparkPlugin from "@github/spark/spark-vite-plugin";
// import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE - commented out until @github/spark is available
    // createIconImportProxy() as PluginOption,
    // sparkPlugin() as PluginOption,
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
});
