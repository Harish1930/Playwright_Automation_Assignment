import { defineConfig } from '@playwright/test';

export default defineConfig({

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
    }

});