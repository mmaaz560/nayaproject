import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
        exclude: ['mongoose'], // 🔴 Yeh line add karo
    },
    server: {
        fs: {
            // Frontend ko sirf apne folder tak restrict karo, backend tak na jane do
            strict: true,
            allow: ['..']
        }
    }
})