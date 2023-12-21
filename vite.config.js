export default {
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
  }