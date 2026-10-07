import fs from 'node:fs';
import {chromium} from 'playwright';

const out='/workspace/previsualisation/surya-summary-assets';
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
for(const [name,route,width,height,selector] of [
  ['home','/',1440,780],
  ['rooms-wide','/rooms/agung-view',1280,800],
  ['rooms-details','/rooms/agung-view',1280,800,'.room-overview'],
  ['spa-wide','/spa',1280,800],
  ['spa-detail','/spa',1280,900,'.spa-signature-section'],
  ['yoga-wide','/yoga',1280,900],
  ['yoga-detail','/yoga',1280,900,'.yoga-guidance-section'],
  ['dining-wide','/dining',1280,800],
  ['dining-detail','/dining',1280,900,'.dining-made-here'],
  ['dining-flavours','/dining',1280,900,'.dining-table-story'],
  ['story-wide','/our-story',1280,900],
  ['mobile','/',390,844],
  ['gallery-mobile','/gallery',390,844],
  ['pool-evening','/',1440,1000,'.home-pool-photo'],
]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('http://127.0.0.1:5174'+route);
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('main img').first().evaluate(img=>img.decode());
  if(selector){
    const target=page.locator(selector);
    await target.scrollIntoViewIfNeeded();
    await target.evaluate(async el=>{const images=el.matches('img')?[el]:[...el.querySelectorAll('img')];await Promise.all(images.map(async img=>{img.loading='eager';await img.decode();}));});
    await page.addStyleTag({content:'.site-header,.skip-link{visibility:hidden!important}'});
    await target.screenshot({path:`${out}/${name}.jpg`,type:'jpeg',quality:88});
    await page.close();
    continue;
  }
  if(name==='gallery-mobile'){
    await page.locator('.gallery-controls').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY-115));
    await page.locator('.gallery-tile img').first().evaluate(img=>img.decode());
    await page.waitForTimeout(300);
  }
  await page.screenshot({path:`${out}/${name}.jpg`,type:'jpeg',quality:86});
  await page.close();
}
await browser.close();
console.log('Thirteen current website previews captured for the expanded proposal.');
