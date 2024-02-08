import nodePolyfills from 'vite-plugin-node-stdlib-browser'


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [
      nodePolyfills(),
    ],
    define: { 'process.env': {} },
    build: {
      sourcemap: false, // with true the app doesn't build
      minify: 'terser',
      rollupOptions: {
        cache: false,
        plugins: [],
        maxParallelFileOps: 2,
        output: {
          sourcemap: false,
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: false,
      },
    },

    resolve: {
      alias: {
        stream: 'stream-browserify',
        process: 'process/browser',
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
  }
})
