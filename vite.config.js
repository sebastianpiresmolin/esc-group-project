import { defineConfig } from 'vite'

export default defineConfig({
    server: {
      port: 5501
    },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          entryFileNames: `bundle.js`,
          chunkFileNames: `bundle.js`,
          assetFileNames: `[name].[ext]`
        }
      }
    }
  })