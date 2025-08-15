import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        ignores: ['assets/js/main.js'], // Handle separately
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                FormData: 'readonly',
                fetch: 'readonly',
                IntersectionObserver: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                NodeList: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'no-console': 'off', // Allow console for debugging
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': 'error',
            'no-multiple-empty-lines': ['error', { max: 2 }],
            'brace-style': ['error', '1tbs'],
            'comma-dangle': ['error', 'never'],
            'no-var': 'error',
            'prefer-const': 'error',
            'arrow-spacing': 'error',
            'space-before-blocks': 'error',
            'keyword-spacing': 'error'
        }
    },
    {
        files: ['assets/js/main.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script', // Keep as script for vanilla JS
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                FormData: 'readonly',
                fetch: 'readonly',
                IntersectionObserver: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                NodeList: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
            'no-console': 'off', // Allow console for debugging
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': 'error',
            'no-multiple-empty-lines': ['error', { max: 2 }],
            'brace-style': ['error', '1tbs'],
            'comma-dangle': ['error', 'never'],
            'no-var': 'error',
            'prefer-const': 'error',
            'arrow-spacing': 'error',
            'space-before-blocks': 'error',
            'keyword-spacing': 'error'
        }
    },
    {
        // Ignore node_modules and build directories
        ignores: ['node_modules/**', 'dist/**', 'build/**', '.git/**']
    }
];
