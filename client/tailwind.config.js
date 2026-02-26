/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tunely: {
                    dark: '#0a0a0f',
                    darker: '#06060a',
                    card: '#12121a',
                    surface: '#1a1a28',
                    border: '#2a2a3a',
                    primary: '#8b5cf6',
                    'primary-light': '#a78bfa',
                    'primary-dark': '#7c3aed',
                    accent: '#06ffa5',
                    'accent-dim': '#05cc84',
                    pink: '#ec4899',
                    cyan: '#22d3ee',
                    text: '#e2e8f0',
                    'text-dim': '#94a3b8',
                    'text-muted': '#64748b',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'wave': 'wave 1.5s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'wave': {
                    '0%, 100%': { transform: 'scaleY(0.5)' },
                    '50%': { transform: 'scaleY(1.5)' },
                },
                'slideUp': {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'fadeIn': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
