import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    watch: {
      ignored: ['**/.git-portable/**'],
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
  },
  ssr: {
    noExternal: ['react-router-dom', 'react-router'],
  },
}))
