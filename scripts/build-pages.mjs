import fs from 'node:fs';
const html=fs.readFileSync('dist/index.html','utf8');
for(const route of ['about','cottages','gallery','experience','contact']){fs.mkdirSync('dist/'+route,{recursive:true});fs.writeFileSync('dist/'+route+'/index.html',html);}
fs.writeFileSync('dist/404.html',html);
console.log('Six separate pages generated.');
