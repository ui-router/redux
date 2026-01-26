import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // More specific alias must come first
      { find: '@uirouter/redux/react', replacement: path.resolve(__dirname, '../../react/index.ts') },
      { find: '@uirouter/redux', replacement: path.resolve(__dirname, '../../core/index.ts') },
    ],
  },
});
