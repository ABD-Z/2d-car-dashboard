import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';


export default defineConfig({
    plugins: [
        react(),
        dts(),
        libInjectCss()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: '2d-car-dashboard-build',
            formats: ['es'],
            fileName: '2d-car-dashboard',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react', 'react/jsx-runtime', 'leaflet/dist/leaflet.css'],
            input: Object.fromEntries(glob.sync('src/**/*.{ts,tsx}').map(function (file) { return [
                relative('src', file.slice(0, file.length - extname(file).length)),
                fileURLToPath(new URL(file, import.meta.url))
            ]; })),
            output: {
                assetFileNames: 'Assets/[name][extname]',
                entryFileNames: '[name].js'
            }
        },
    },
});
