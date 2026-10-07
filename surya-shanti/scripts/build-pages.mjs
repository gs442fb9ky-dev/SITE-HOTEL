import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {routeNames,routePaths} from '../src/routes.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(root,'docs/surya-shanti');
const template=fs.readFileSync(path.join(out,'index.html'),'utf8');
for(const route of routePaths){
  const parts=route.split('/').filter(Boolean);
  const destination=path.join(out,...parts);
  fs.mkdirSync(destination,{recursive:true});
  const relative=parts.length?'../'.repeat(parts.length):'./';
  const html=template.replaceAll('./assets/',relative+'assets/').replace(/<title>[^<]*<\/title>/,`<title>${routeNames[route]} — Surya Shanti Villa</title>`);
  fs.writeFileSync(path.join(destination,'index.html'),html);
}
fs.writeFileSync(path.join(out,'404.html'),template);
console.log(`Built ${routePaths.length} distinct preview pages, sharing local images and fonts.`);
