// https://nuxt.com/docs/api/configuration/nuxt-config
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import inject from '@rollup/plugin-inject'


export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {plugins: [nodePolyfills()],define: { 'process.env': {} },
  build: {
    sourcemap: false, // with true the app doesn't build
    minify: 'terser',
    rollupOptions: {
      cache: false,
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
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
      Buffer: 'buffer',
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
  },},
})
