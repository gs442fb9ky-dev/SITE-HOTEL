import fs from 'node:fs';
import {chromium} from 'playwright';

const out='/workspace/previsualisation/surya-summary-assets';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
for(const [name,route,width,height] of [
  ['home','/',1440,780],
  ['room','/rooms/agung-view',1280,720],
  ['spa','/spa',1280,720],
  ['story','/our-story',1280,720],
  ['mobile','/',390,844],
]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('http://127.0.0.1:5174'+route);
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('main img').first().evaluate(img=>img.decode());
  await page.screenshot({path:`${out}/${name}.jpg`,type:'jpeg',quality:86});
  await page.close();
}
await browser.close();
console.log('Five current website previews captured for the three-page summary.');
