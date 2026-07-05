import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, '../data'),
      '@design-system': path.resolve(__dirname, '../design-system'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      '@phosphor-icons/react': path.resolve(
        __dirname,
        'node_modules/@phosphor-icons/react'
      ),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@design-system/styles/variables" as *;\n`,
      },
    },
  },
});
