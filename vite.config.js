import path from "path";
import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import viteCompression from "vite-plugin-compression";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

export default ({ command, mode }) => {
  const envConfig = loadEnv(mode, "./");
  const config = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      sourcemap: true,
      // assetsDir: 'static/img',
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
        },
      },
    },
    plugins: [
      reactRefresh(),
      createStyleImportPlugin({ resolves: [AntdResolve()] }),
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    server: {
      host: envConfig.VITE_HOST,
      port: envConfig.VITE_PORT,
      // 是否自动在浏览器打开
      open: true,
      // 是否开启 https
      https: false,
      // 服务端渲染
      ssr: false,
      base: envConfig.VITE_BASE_URL,
      outDir: envConfig.VITE_OUTPUT_DIR,
      define: {
        "process.env": {},
      },
    },
  };
  return defineConfig(config);
};
