import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import './style.css';
import {base, arrow, escape, image, imageURL, photograph, href, link, hero, sectionHead, bookingLink, contactLink, zoomImage, hotelPhone} from './ui.js';
import {rooms} from './rooms-data.js';
import {routeNames} from './routes.js';
import {storyPage} from './pages/story.js';
import {spaPage, yogaPage} from './pages/wellness.js';
import {diningPage} from './pages/dining.js';
import {experiencesPage} from './pages/experiences.js';

const navigation = [['/rooms','Rooms'],['/spa','Spa'],['/yoga','Yoga'],['/dining','Dining'],['/our-story','Our Story'],['/experiences','Experiences'],['/gallery','Gallery'],['/contact','Contact']];
const app = document.getElementById('app');
const conceptName = new URLSearchParams(location.hash.startsWith('#name=') ? location.hash.slice(1) : '').get('name');
let activeRoute = '/', dialogPhotos = [], dialogIndex = 0, previousFocus;

function currentLocation() {
  let value;
  if (window.__SURYA_OFFLINE__) value = location.hash.startsWith('#/') ? location.hash.slice(1) : '/';
  else value = location.pathname.slice(base.length).replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
  const [path, query] = value.split('?');
  return {path: path || '/', query: new URLSearchParams(window.__SURYA_OFFLINE__ ? query || '' : location.search)};
}

function brand() {
  return `<a class="brand" data-route="/" href="${href('/')}" aria-label="Surya Shanti Villa home"><img src="${window.__SURYA_MARK__ || base+'/brand-mark.svg'}" alt="" width="34" height="34"><span class="brand-name">Surya Shanti<small>VILLA · SIDEMEN</small></span></a>`;
}

function header(overPhoto) {
  const links = navigation.map(([route,label])=>`<a data-route="${route}" href="${href(route)}" ${activeRoute===route || route==='/rooms'&&activeRoute.startsWith('/rooms/') ? 'aria-current="page"':''}>${label}</a>`).join('');
  return `<header class="site-header ${overPhoto?'over-photo':''}">${brand()}<nav class="desktop-nav" aria-label="Main navigation">${links}</nav><button class="menu-toggle" type="button" aria-controls="mobile-menu" aria-expanded="false">Menu <span aria-hidden="true">+</span></button><a class="button header-book" href="https://us2.cloudbeds.com/en/reservation/5USoMX?currency=idr" target="_blank" rel="noopener noreferrer">PLAN YOUR STAY ${arrow}</a></header><div class="mobile-menu" id="mobile-menu" hidden><nav aria-label="Mobile navigation">${link('/','Home','')} ${links}</nav>${bookingLink()}</div>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-top"><div class="footer-brand"><div class="footer-wordmark">Surya<br><em>Shanti.</em></div><p class="footer-place">SIDEMEN · KARANGASEM · BALI</p><p class="caption">Surya, the sun. Shanti, the peace.</p></div><nav class="footer-links" aria-label="Footer navigation">${navigation.map(([route,label])=>link(route,label,'')).join('')}</nav><div class="footer-contact"><p class="eyebrow">Let’s plan your stay</p><a href="mailto:reservation@suryashantivilla.com">reservation@suryashantivilla.com</a><a href="tel:+6285645288463">${hotelPhone}</a><a href="https://wa.me/6285645288463" target="_blank" rel="noopener noreferrer">WhatsApp ${arrow}</a><a href="https://us2.cloudbeds.com/en/reservation/5USoMX?currency=idr" target="_blank" rel="noopener noreferrer">Check availability ${arrow}</a></div></div><div class="footer-note"><span>Unofficial website redesign concept · Photography and hotel information from <a href="https://suryashantivilla.com/" target="_blank" rel="noopener noreferrer">Surya Shanti’s official website</a>.</span><span id="concept-credit">A proposal for Surya Shanti Villa · For evaluation</span></div></footer>`;
}

function homePage() {
  return `<div class="home-page"><section class="page-hero home-hero">${image(22,{className:'hero-photo',eager:true,position:'50% 56%',sizes:'(max-width:760px) max(100vw, 145svh), 100vw'})}<div class="hero-content"><p class="eyebrow">A BOUTIQUE HOTEL IN THE SIDEMEN VALLEY</p><h1>Surya<br><em>Shanti.</em></h1><p class="hero-description">The sun. The peace. A little corner of Bali.</p><span class="hero-coordinate">SIDEMEN, BALI · SINCE 2010</span><a class="hero-scroll" href="#page-content">ENTER OUR WORLD <span aria-hidden="true">↓</span></a></div></section>
  <section class="section" id="page-content"><div class="container home-welcome"><figure>${image(0,{className:'home-pool-photo',position:'50% 52%'})}<figcaption class="caption">Our pools and thatched roofs, with Mount Agung beyond.</figcaption></figure><div class="home-intro-copy"><p class="eyebrow">SUN, PEACE & SIDEMEN</p><h2>A place shaped<br>by <em>people<br>and place.</em></h2><div class="prose"><p>Between the rice terraces and Mount Agung, Surya Shanti is a small, personal world of villas, tropical gardens and open views.</p><p>It began with the friendship of three women and a shared love of Bali. Today, that same spirit is found in the welcome, the kitchen and the people who make you feel at home.</p></div>${link('/our-story','Discover our story')}${image(33,{className:'home-intro-detail',alt:'The infinity pool overlooking the Sidemen Valley at sunset'})}</div></div></section>
  <section class="section section-sand"><div class="container">${sectionHead('Your time at Surya Shanti','Stay a little.<br><em>Feel a little more.</em>')}<div class="home-chapters">${[[98,'/rooms','Rooms & villas','A canopy bed, an open terrace, a view to wake up to.'],[58,'/spa','The spa','Traditional techniques, attentive therapists and time to unwind.'],[7,'/yoga','Yoga in Sidemen','Sun salutations, postures and breathwork with Wayan and his team.']].map(([id,route,title,copy])=>`<article class="chapter-card"><a class="chapter-link" data-route="${route}" href="${href(route)}" aria-label="Explore ${escape(title)}">${image(id,{className:'chapter-image',sizes:'(max-width:760px) 100vw, 33vw'})}</a><h3>${title}</h3><p>${copy}</p>${link(route,'Explore')}</article>`).join('')}</div></div></section>
  <section class="section"><div class="container split">${image(10,{className:'home-dining-photo',position:'50% 45%'})}<div class="home-dining-copy"><p class="eyebrow">AT OUR TABLE</p><h2>A Balinese heart.<br><em>A French touch.</em></h2><div class="prose"><p>Local ingredients meet French culinary know-how in a kitchen that makes its own bread, marmalades and ice cream with fruit from the garden.</p><p>From a Balinese platter to a slow breakfast overlooking the valley, the pleasure is in taking your time.</p></div>${link('/dining','Take a seat at our table')}</div></div></section>
  <section class="section section-dark"><div class="container home-friendship"><div><p class="eyebrow">THE PEOPLE BEHIND THE PLACE</p><h2>It began with<br><em>friendship.</em></h2><div class="prose"><p>Ibu Ati from Bali. Pauline from the Philippines. Sylvie from France. Their shared dream became Surya Shanti, inaugurated in 2010 with close friends.</p><p>A human story, rooted in a love of Sidemen and a wish to share it.</p></div>${link('/our-story','Meet the story of Surya Shanti')}</div><figure>${image(85,{className:'home-friendship-photo'})}<figcaption class="caption">A photograph accompanying the friendship story in the hotel’s own archive.</figcaption></figure></div></section>
  <section class="home-sidemen">${image(84,{sizes:'100vw',position:'50% 40%'})}<div class="home-sidemen-copy"><p class="eyebrow">THE VALLEY BEYOND</p><h2>Make space<br>for <em>Sidemen.</em></h2>${link('/experiences','Explore the valley with us')}</div></section>
  <section class="section home-invitation"><div class="container">${sectionHead('COME AS A GUEST, LEAVE AS A FAMILY','Your next chapter,<br><em>in Sidemen.</em>','Explore the rooms and villas, or contact the team to shape your stay.')}${bookingLink()}<div style="margin-top:24px">${link('/rooms','Discover the rooms')}</div></div></section></div>`;
}

function roomsPage() {
  return `<div class="rooms-page"><section class="page-intro"><div class="container page-intro-grid"><div><p class="eyebrow">THE ROOMS & VILLAS</p><h1>A little room<br>to <em>be yourself.</em></h1></div><p class="prose">Canopy beds, terraces and the warmth of Balinese spaces. Discover five room and villa categories, each with its own connection to Surya Shanti.</p></div></section><div class="rooms-opening">${image(25,{eager:true,sizes:'100vw'})}</div><section class="section"><div class="container"><p class="rooms-introduction">From a suite looking towards Agung to a traditional wooden Joglo beside the river, choose your own way to settle into Sidemen.</p></div></section><section class="container" aria-label="Our five room and villa categories">${rooms.map((room,index)=>`<article class="room-card"><a class="room-card-media" data-route="/rooms/${room.slug}" href="${href('/rooms/'+room.slug)}" aria-label="Discover ${escape(room.title)}">${image(room.heroId,{sizes:'(max-width:760px) 100vw, 56vw'})}</a><div class="room-card-copy"><p class="room-card-number">0${index+1} / ROOMS & VILLAS</p><h2>${room.title}</h2><p class="prose">${room.description}</p>${link('/rooms/'+room.slug,'Discover this room')}</div></article>`).join('')}</section><section class="section section-sand home-invitation"><div class="container">${sectionHead('Your stay, your pace','Find your own<br><em>corner of Sidemen.</em>','For current availability and room options, visit our official reservation service.')}${bookingLink()}</div></section></div>`;
}

function roomPage(room) {
  const next = rooms[(rooms.indexOf(room)+1)%rooms.length];
  return `<div class="room-detail">${hero({imageId:room.heroId,title:room.title,kicker:'ROOMS & VILLAS · SURYA SHANTI',description:room.tagline})}<section class="section" id="page-content"><div class="container room-overview"><div><p class="eyebrow">YOUR OWN CORNER OF SIDEMEN</p><h2>${room.tagline}</h2><p class="prose">${room.description}</p><div class="room-actions">${bookingLink()}${contactLink(room.title,'Ask about this room')}</div></div><ul class="room-features" aria-label="Verified room features">${room.features.map(feature=>`<li>${feature}</li>`).join('')}</ul></div></section><section class="section section-sand"><div class="container">${sectionHead('The room, in detail','A closer<br><em>look.</em>')}<div class="room-gallery">${room.photoIds.map(id=>zoomImage(id,photograph(id).alt)).join('')}</div></div></section><section class="section"><div class="container room-next"><div><p class="eyebrow">CONTINUE EXPLORING</p><h2>${next.title}</h2></div>${link('/rooms/'+next.slug,'Discover the next room')}</div></section></div>`;
}

const galleryIds = [0,22,98,101,105,111,112,30,34,10,35,21,58,59,57,64,7,69,81,84,27,85,90,91,75,74,12,115,20,26,33,96,99,113,56,63,54,72];
const galleryFilters = [['ALL','All photographs'],['ROOMS','Rooms & villas'],['POOL','Pools & gardens'],['SPA','Spa'],['YOGA','Yoga'],['RESTAURANT','Dining'],['SIDEMEN','Sidemen'],['OUR STORY','Our story']];

function galleryPage() {
  return `<div class="gallery-page"><section class="page-intro"><div class="container page-intro-grid"><div><p class="eyebrow">THE GALLERY</p><h1>Surya Shanti,<br><em>in photographs.</em></h1></div><p class="prose">The rooms, the pools, the tables and the people. A glimpse of the real place, through photographs from Surya Shanti’s own website.</p></div></section><section class="container" aria-label="Photograph gallery"><div class="gallery-controls" role="group" aria-label="Filter photographs">${galleryFilters.map(([key,label],index)=>`<button type="button" data-filter="${key}" aria-pressed="${index===0}">${label}</button>`).join('')}</div><p class="gallery-count" aria-live="polite">${galleryIds.length} photographs</p><div class="gallery-grid">${galleryIds.map(id=>`<div class="gallery-tile" data-categories="${escape(photograph(id).categories.join('|'))}">${zoomImage(id,photograph(id).alt,{sizes:'(max-width:380px) 100vw, (max-width:1050px) 50vw, 33vw'})}</div>`).join('')}</div></section><section class="section gallery-invitation section-sand"><div class="container">${sectionHead('Beyond the photographs','Make it<br><em>your own story.</em>')}${bookingLink()}</div></section></div>`;
}

function contactPage(query) {
  const topic = query.get('interest') || 'My stay at Surya Shanti';
  return `<div class="contact-page"><section class="page-intro"><div class="container page-intro-grid"><div><p class="eyebrow">CONTACT & PLAN YOUR STAY</p><h1>Let’s make<br>room for <em>you.</em></h1></div><p class="prose">A question about a room, a treatment, a class or a few days in Sidemen? The team at Surya Shanti will help you explore the possibilities.</p></div></section><section class="section"><div class="container contact-intro">${image(20,{eager:true,position:'50% 50%'})}<div class="contact-info"><p class="eyebrow">SURYA SHANTI VILLA · SIDEMEN</p><h2>Begin the<br><em>conversation.</em></h2><a class="contact-item" href="mailto:reservation@suryashantivilla.com"><small>Reservations</small>reservation@suryashantivilla.com</a><a class="contact-item" href="mailto:contact@suryashantivilla.com"><small>General enquiries</small>contact@suryashantivilla.com</a><a class="contact-item" href="tel:+6285645288463"><small>Reception</small>${hotelPhone}</a><a class="contact-item" href="https://wa.me/6285645288463" target="_blank" rel="noopener noreferrer"><small>WhatsApp</small>Chat with the team ${arrow}</a>${bookingLink()}</div></div></section><section class="section section-sand"><div class="container contact-location"><div><p class="eyebrow">FIND US IN THE VALLEY</p><h2>Sidemen.<br><em>A different rhythm.</em></h2></div><div class="prose"><p>Surya Shanti Villa is in Sidemen, Karangasem, in eastern Bali. Rice terraces, Mount Agung and the valley’s living traditions form the setting for your stay.</p><p>The hotel describes the drive from Denpasar airport as approximately one and a half hours.</p><a class="text-link" href="https://goo.gl/maps/D99joqSa2dSgZaA49" target="_blank" rel="noopener noreferrer">Open directions ${arrow}</a></div></div></section><section class="section"><div class="container contact-form-layout"><div><p class="eyebrow">SHARE YOUR PLANS</p><h2>A little about<br><em>your stay.</em></h2><p class="prose">Prepare an enquiry for the hotel. We’ll prepare an email draft for you to open, review and send from your email app.</p><p class="enquiry-note">Your details are used here to prepare your email draft.</p><a class="text-link" href="mailto:sales@suryashantivilla.com">Sales enquiries ${arrow}</a></div><form class="enquiry-form" id="enquiry-form"><label>Your name<input name="name" autocomplete="name" required></label><label>Your email<input name="email" type="email" autocomplete="email" required></label><label>I’d like to ask about<input name="interest" value="${escape(topic)}" required></label><div class="date-fields"><label>Arrival, if known<input name="arrival" type="date"></label><label>Departure, if known<input name="departure" type="date"></label></div><label>Your message<textarea name="message" rows="4" required minlength="12"></textarea></label><button class="button" type="submit">Prepare my enquiry ${arrow}</button><p id="enquiry-status" class="enquiry-status" role="status"></p><div id="enquiry-result" class="enquiry-result" hidden><p>Your enquiry is ready. Open the email draft, then review and send it from your email app.</p><a id="email-draft" class="text-link">Open your email draft ${arrow}</a></div></form></div></section></div>`;
}

function dialogMarkup() {
  return `<dialog class="photo-dialog" id="photo-dialog" aria-label="Photograph viewer"><button type="button" class="dialog-close" aria-label="Close photograph">×</button><img class="photo-dialog-image" alt=""><div class="dialog-bottom"><p class="dialog-caption"></p><div class="dialog-actions"><button type="button" data-direction="-1" aria-label="Previous photograph">←</button><button type="button" data-direction="1" aria-label="Next photograph">→</button></div></div></dialog>`;
}

function render({focus=false}={}) {
  const {path,query}=currentLocation();
  activeRoute=path;
  document.body.classList.remove('menu-open','is-dialog-open');
  let content;
  if(path==='/') content=homePage();
  else if(path==='/rooms') content=roomsPage();
  else if(path.startsWith('/rooms/')) {const room=rooms.find(room=>'/rooms/'+room.slug===path);content=room?roomPage(room):null;}
  else content=({'/spa':spaPage,'/yoga':yogaPage,'/dining':diningPage,'/our-story':storyPage,'/experiences':experiencesPage,'/gallery':galleryPage,'/contact':()=>contactPage(query)})[path]?.();
  if(!content) content=`<section class="not-found"><p class="eyebrow">SURYA SHANTI VILLA</p><h1>A different<br><em>path.</em></h1><p>Let’s take you back to the villa.</p>${link('/','Return home')}</section>`;
  const overPhoto=path==='/'||path==='/spa'||path==='/dining'||path==='/experiences'||path.startsWith('/rooms/');
  document.title=(routeNames[path]||'Page not found')+' — Surya Shanti Villa';
  app.innerHTML=header(overPhoto)+`<main id="main" tabindex="-1">${content}</main>`+footer()+dialogMarkup();
  const first=Array.from(document.querySelectorAll('main section')).find(section=>!section.classList.contains('page-hero'));
  if(first&&!first.id)first.id='page-content';
  if(conceptName)document.getElementById('concept-credit').textContent='Website concept and design by '+conceptName+' · For evaluation only';
  document.getElementById('photo-dialog').addEventListener('close',()=>{document.body.classList.remove('is-dialog-open');previousFocus?.focus();});
  document.getElementById('enquiry-form')?.addEventListener('submit',prepareEnquiry);
  updateHeader();
  if(focus){const heading=document.querySelector('main h1');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});}
}

function navigate(route) {
  if(window.__SURYA_OFFLINE__) {location.hash=route;}
  else {history.pushState({},'',href(route));render({focus:true});window.scrollTo(0,0);}
}

function updateHeader(){document.querySelector('.site-header')?.classList.toggle('scrolled',window.scrollY>60);}

function updateDialog(){const id=dialogPhotos[dialogIndex];const image=document.querySelector('.photo-dialog-image');image.src=imageURL(id,true);image.alt=photograph(id).alt;document.querySelector('.dialog-caption').textContent=photograph(id).alt;}
function changePhoto(direction){dialogIndex=(dialogIndex+direction+dialogPhotos.length)%dialogPhotos.length;updateDialog();}

document.addEventListener('click',event=>{
  const anchor=event.target.closest('a[data-route]');
  if(anchor&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&event.button===0){event.preventDefault();navigate(anchor.dataset.route);return;}
  const scrollAnchor=event.target.closest('a[href^="#"]:not([data-route])');
  if(scrollAnchor){const target=document.getElementById(scrollAnchor.getAttribute('href').slice(1));if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}return;}
  const toggle=event.target.closest('.menu-toggle');
  if(toggle){const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));document.getElementById('mobile-menu').hidden=!open;document.body.classList.toggle('menu-open',open);return;}
  const filter=event.target.closest('[data-filter]');
  if(filter){const key=filter.dataset.filter;document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===filter)));let count=0;document.querySelectorAll('.gallery-tile').forEach(tile=>{tile.hidden=key!=='ALL'&&!tile.dataset.categories.split('|').includes(key);if(!tile.hidden)count++;});document.querySelector('.gallery-count').textContent=count+' photographs';return;}
  const zoom=event.target.closest('[data-photo]');
  if(zoom){previousFocus=zoom;dialogPhotos=Array.from(document.querySelectorAll('[data-photo]')).filter(button=>!button.closest('[hidden]')).map(button=>Number(button.dataset.photo));dialogIndex=dialogPhotos.indexOf(Number(zoom.dataset.photo));updateDialog();document.getElementById('photo-dialog').showModal();document.body.classList.add('is-dialog-open');return;}
  if(event.target.closest('.dialog-close'))document.getElementById('photo-dialog').close();
  const direction=event.target.closest('[data-direction]');if(direction)changePhoto(Number(direction.dataset.direction));
  if(event.target===document.getElementById('photo-dialog'))document.getElementById('photo-dialog').close();
});

document.addEventListener('keydown',event=>{
  if(document.getElementById('photo-dialog')?.open){if(event.key==='ArrowRight')changePhoto(1);if(event.key==='ArrowLeft')changePhoto(-1);}
  else if(event.key==='Escape'&&document.body.classList.contains('menu-open')){document.querySelector('.menu-toggle').click();document.querySelector('.menu-toggle').focus();}
});

function prepareEnquiry(event){
  event.preventDefault();const form=event.currentTarget;const data=new FormData(form);const status=document.getElementById('enquiry-status');
  document.getElementById('enquiry-result').hidden=true;
  if(data.get('arrival')&&data.get('departure')&&data.get('departure')<=data.get('arrival')){status.textContent='Please choose a departure date after your arrival.';return;}
  const subject='Surya Shanti enquiry — '+data.get('interest');
  const lines=['Hello Surya Shanti team,','',String(data.get('message')),'','Name: '+data.get('name'),'Email: '+data.get('email'),'Interest: '+data.get('interest')];
  if(data.get('arrival'))lines.push('Arrival: '+data.get('arrival'));if(data.get('departure'))lines.push('Departure: '+data.get('departure'));
  document.getElementById('email-draft').href='mailto:reservation@suryashantivilla.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
  status.textContent='Your enquiry is ready to review. It has not been sent.';document.getElementById('enquiry-result').hidden=false;
}

window.addEventListener('popstate',()=>render({focus:true}));
window.addEventListener('hashchange',()=>{if(window.__SURYA_OFFLINE__){render({focus:true});window.scrollTo(0,0);}});
window.addEventListener('scroll',updateHeader,{passive:true});
render();
