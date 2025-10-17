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
    },
    extensions: ['.js', '.ts', '.vue', '.scss', '.css']
  },
  // 优化热更新配置
  server: {
    // 启用热模块替换
    hmr: {
      // 启用全量重载，当热更新失败时自动刷新页面
      fullReload: true,
      // 增加超时时间，避免大文件更新失败
      timeout: 30000,
      // 启用HTTPS（如果需要）
      https: false,
      // 修复WebSocket连接问题
      protocol: 'ws',
      // 自动检测端口
      clientPort: undefined
    },
    // 监听monorepo中的packages目录变化
    watch: {
      // 监听范围扩展到monorepo根目录
      include: ['src/**/*', '../../packages/**/*'],
      // 忽略node_modules目录
      exclude: ['**/node_modules/**', '**/dist/**', '**/build/**']
    },
    // 增加服务器性能
    maxPayloadSize: 16 * 1024 * 1024, // 16MB
    // 服务器端口
    port: 5185,
    // 严格端口检查
    strictPort: false,
    // 启用跨域
    cors: true
  },
  // 构建优化
  optimizeDeps: {
    // 预构建依赖，减少冷启动时间
    include: ['@project/ui', '@project/utils', 'vue', 'vue-router', 'pinia'],
    // 强制预构建所有外部依赖
    force: true,
    // 缓存目录配置
    cacheDir: path.resolve(__dirname, 'node_modules/.vite')
    // 完全移除rollupOptions配置，避免兼容性问题
  },
  // 构建配置
  build: {
    // 启用sourcemap
    sourcemap: true,
    // 启用CSS分离
    cssCodeSplit: true,
    // 输出目录
    outDir: 'dist',
    // 资源目录
    assetsDir: 'assets'
  }
})