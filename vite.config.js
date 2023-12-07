export default {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `bundle.js`,
          chunkFileNames: `bundle.js`,
          assetFileNames: `[name].[ext]`
        }
      }
    }
  }