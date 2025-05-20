import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import { injectMeticulousRecordingScript } from './meticulousPlugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode !== 'production' && injectMeticulousRecordingScript
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true, // Enables global test functions like `describe`, `test`, etc.
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: '/Volumes/Personal/Projects/React Projects/Shopping Site/cart-commerce-react-app/src/tests/setup.ts', // Path to the setup file /Volumes/Personal/Projects/React Projects/Shopping Site/cart-commerce-react-app/src/tests/setup.ts src/tests/setup.ts
    coverage: {
      reporter: ['text', 'html'] // Generates coverage reports
    }
  }
}));
