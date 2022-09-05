import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
export default defineConfig({
  plugins: [react(),
  vitePluginImp({
    libList: [
      {
        libName: "antd",
        libDirectory: 'es',
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    },

    modules: { // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
  },
  base: './',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src') // src 路径
    }
  },
  build:{
    outDir:'docs'
  }
})
