import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@project/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@project/utils': path.resolve(__dirname, '../../packages/utils/src')
    }
  }
})