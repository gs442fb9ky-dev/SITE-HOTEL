import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 1,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:5174',
    browserName: 'chromium',
    launchOptions: {executablePath: '/usr/bin/chromium', args: ['--no-sandbox']},
    viewport: {width: 1440, height: 1000},
  },
  reporter: 'list',
});
