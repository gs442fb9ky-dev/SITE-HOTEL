import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PDFDocument} from 'pdf-lib';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const out=path.join(root,'docs/surya-shanti-proposal');
const template=fs.readFileSync('/workspace/previsualisation/Surya-Shanti-summary-template.pdf');
const pdf=await PDFDocument.load(template);
if(pdf.getPageCount()!==8)throw new Error('The expanded proposal must contain exactly eight pages.');
if(pdf.getForm().getFields().some(field=>field.getText()))throw new Error('The public template contains personal details.');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'summary-template.pdf'),template);
fs.copyFileSync(path.join(root,'node_modules/pdf-lib/dist/pdf-lib.min.js'),path.join(out,'pdf-lib.min.js'));
const html=`<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="robots" content="noindex,nofollow"><title>Surya Shanti — Présentation PDF</title>
<style>
[hidden]{display:none!important}*{box-sizing:border-box}body{margin:0;background:#f3f0e7;color:#233e35;font-family:Arial,sans-serif}main{max-width:900px;margin:48px auto;padding:0 24px}.eyebrow{font-size:10px;letter-spacing:2px}h1{font:48px Georgia,serif;line-height:1.1;margin:24px 0}p{font-size:14px;line-height:1.8;color:#667268}.controls{display:flex;gap:20px;flex-wrap:wrap}label{display:flex;flex-direction:column;gap:8px;font-size:12px}input{padding:12px;border:1px solid #cec8b9;background:#fff;font-size:16px;width:280px;max-width:100%}button,.download{display:inline-block;border:0;background:#233e35;color:white;padding:18px 24px;margin:24px 12px 12px 0;text-decoration:none;font-size:14px;cursor:pointer}button:disabled{opacity:.6}.open{font-size:13px;text-decoration:underline}iframe{display:block;width:100%;height:650px;border:1px solid #cec8b9;margin-top:20px;background:white}footer{margin:24px 0;font-size:11px;line-height:1.8;color:#667268}a:focus-visible,button:focus-visible,input:focus-visible{outline:2px solid #987652;outline-offset:4px}@media(max-width:600px){main{margin:30px auto}h1{font-size:38px}iframe{height:440px}.controls{display:block}label{margin:15px 0}.download{margin-right:0}}
</style></head><body><main>
<p class="eyebrow">SURYA SHANTI VILLA · PRÉSENTATION DU PROJET</p>
<h1>Votre présentation,<br>prête à envoyer.</h1>
<p>Un dossier de huit pages en anglais, avec de grands aperçus du site, des pages consacrées aux chambres, au Spa, au Yoga, au Restaurant et à votre histoire, puis une proposition de collaboration.</p>
<div class="controls"><label>Votre nom<input id="name" autocomplete="name" maxlength="50"></label><label>Votre numéro<input id="phone" type="tel" autocomplete="tel" maxlength="35"></label></div>
<button id="generate" type="button">Préparer le PDF</button><a id="download" class="download" hidden>Télécharger le PDF</a><a id="open" class="open" hidden target="_blank" rel="noopener">Ouvrir le PDF</a>
<p id="status" role="status"></p><iframe id="viewer" title="Aperçu de votre présentation PDF" hidden></iframe>
<footer>Votre nom et votre numéro sont ajoutés dans votre navigateur. Concept et design crédités à votre nom ; photographies créditées à l’hôtel.</footer>
</main><script src="./pdf-lib.min.js"></script><script>
const params=new URLSearchParams(location.hash.slice(1));
const nameInput=document.getElementById('name'),phoneInput=document.getElementById('phone');
nameInput.value=params.get('name')||'';phoneInput.value=params.get('phone')||'';
let currentURL;
const template=fetch('./summary-template.pdf').then(response=>{if(!response.ok)throw new Error('PDF unavailable');return response.arrayBuffer();});
async function generate(){
 const button=document.getElementById('generate'),status=document.getElementById('status');
 const name=nameInput.value.trim(),phone=phoneInput.value.trim();
 if(!name||!phone){status.textContent='Ajoutez votre nom et votre numéro pour préparer le PDF.';return;}
 button.disabled=true;status.textContent='Préparation du PDF…';
 try{
  const pdf=await PDFLib.PDFDocument.load(await template);const form=pdf.getForm();
  for(const field of form.getFields())if(field.getName().startsWith('credit-page-'))field.setText(name);
  for(const key of ['proposer-cover','proposer-end'])form.getTextField(key).setText(name);
  for(const key of ['phone-cover','phone-end'])form.getTextField(key).setText(phone);
  form.flatten();pdf.setAuthor(name);pdf.setSubject('Website concept and design by '+name+'. Shared for evaluation only. Hotel photography credited separately.');
  const result=await pdf.save();if(currentURL)URL.revokeObjectURL(currentURL);
  currentURL=URL.createObjectURL(new Blob([result],{type:'application/pdf'}));
  const download=document.getElementById('download');download.href=currentURL;download.download='Surya-Shanti-Expanded-Website-Proposal-'+name.replace(/[^a-zA-Z0-9 -]/g,'').trim().replace(/ +/g,'-')+'.pdf';download.hidden=false;
  const open=document.getElementById('open');open.href=currentURL;open.hidden=false;
  const viewer=document.getElementById('viewer');viewer.src=currentURL;viewer.hidden=false;
  button.textContent='Actualiser le PDF';status.textContent='Votre présentation de huit pages est prête. Cliquez sur « Télécharger le PDF ».';
 }catch(error){status.textContent='Le PDF n’a pas pu être préparé. Rechargez cette page et réessayez.';}
 finally{button.disabled=false;}
}
document.getElementById('generate').addEventListener('click',generate);
if(nameInput.value&&phoneInput.value)generate();
</script></body></html>`;
fs.writeFileSync(path.join(out,'index.html'),html);
console.log('Eight-page PDF download prepared, with personal details added only in the browser.');
