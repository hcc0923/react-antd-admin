import path from "path";
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import viteCompression from 'vite-plugin-compression';
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';


export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1890ff'
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
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
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
            assetFileNames: '[ext]/[name]-[hash].[ext]',
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
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
})