import { defineConfig } from 'tsdown';

export default defineConfig([
  // Core package
  {
    entry: ['./core/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['@uirouter/core', '@uirouter/react', 'react', 'react-redux', 'redux'],
    sourcemap: true,
  },
  // React package
  {
    entry: { 'react': './react/index.ts' },
    outDir: 'dist',
    format: ['cjs', 'esm'],
    dts: true,
    external: ['@uirouter/core', '@uirouter/react', 'react', 'react-redux', 'redux'],
    sourcemap: true,
  },
]);
