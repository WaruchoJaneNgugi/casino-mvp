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
                'stake-dark': '#0f0f0f',
                'stake-darker': '#0a0a0a',
                'stake-purple': '#6d28d9',
                'stake-purple-dark': '#5b21b6',
                'stake-green': '#22c55e',
                'stake-red': '#ef4444',
                'stake-gold': '#f59e0b',
                'stake-gray': '#1f2937',
                'stake-light-gray': '#374151',
            },
            animation: {
                'stake-pulse': 'stake-pulse 2s ease-in-out infinite',
                'stake-glow': 'stake-glow 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}