import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, './src/components/layouts')
      },
      {
        find: '@img',
        replacement: path.resolve(__dirname, './src/assets/img')
      },
      {
        find: '@icons',
        replacement: path.resolve(__dirname, './src/components/icons')
      }
    ]
  },
  base: './',
  server: {
    port: 4500,
    open: false,
    cors: true
  }
})