import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://books.google.com/books\?jscmd\=ClBrowse\&hl\=en\&as_coll\=1001\&start\=0\&num\=100\&uid\=100550515361463032088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  base: '/kovrr-sr-fullstack/',
})
