import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: process.cwd(),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',

    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'YourLibraryName',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'index.mjs'
          case 'cjs':
            return 'index.cjs'
          case 'umd':
            return 'index.umd.js'
          default:
            return `index.${format}.js`
        }
      },
    },

    rollupOptions: {
      treeshake: true,
      output: {
        format: 'esm',
      },
    },

    sourcemap: false,

    // 修正 Terser 配置
    minify: 'terser',
  },

  plugins: [
    dts({
      outDir: 'dist/types',
      exclude: ['**/*.test.ts', '**/*.spec.ts'],
      cleanVueFileName: true,
    }),
  ],

  server: {
    port: 3000,
    open: false,
    cors: true,
  },

  preview: {
    port: 4000,
  },
})
