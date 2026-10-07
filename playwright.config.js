import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{browserName:'chromium',launchOptions:{executablePath:'/usr/bin/chromium',args:['--no-sandbox']},viewport:{width:1440,height:1000}},reporter:'list'});
