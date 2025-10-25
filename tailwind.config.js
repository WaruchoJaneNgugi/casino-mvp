/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'stake-dark': '#0f172a',
                'stake-darker': '#0a1122',
                'stake-orange': '#f97316',
                'stake-orange-dark': '#ea580c',
                'stake-green': '#00ff00',
                'stake-red': '#ff4444',
                'stake-gold': '#ffd700',
                'stake-gray': '#1e293b',
                'stake-light-gray': '#334155',
                'stake-border': '#475569',
            },
            animation: {
                'promotion-glow': 'promotion-glow 2s ease-in-out infinite alternate',
            },
        },
    },
    plugins: [],
}