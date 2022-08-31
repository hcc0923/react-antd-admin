import { resolve } from "path";
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import viteCompression from "vite-plugin-compression";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

export default defineConfig((mode: ConfigEnv): UserConfig => {
  const configEnv = loadEnv(mode.mode, "./");

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: configEnv.VITE_HOST,
      port: Number(configEnv.VITE_PORT),
      https: false,
    },
    plugins: [
      reactRefresh(),
      createStyleImportPlugin({ resolves: [AntdResolve()] }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    esbuild: {
      pure:
        configEnv.VITE_HOST === "production" ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: configEnv.VITE_OUTPUT_DIR,
      minify: "esbuild",
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
