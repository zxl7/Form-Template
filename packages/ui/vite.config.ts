import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'UI',
            fileName: 'ui'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [vue()]
})