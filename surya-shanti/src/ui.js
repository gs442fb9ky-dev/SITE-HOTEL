import {photos} from './photos.js';

export const bookingURL = 'https://us2.cloudbeds.com/en/reservation/5USoMX?currency=idr';
export const hotelEmail = 'contact@suryashantivilla.com';
export const hotelPhone = '+62 856 4528 8463';
const marker = location.pathname.indexOf('/surya-shanti/');
export const base = window.__SURYA_BASE__ ?? (marker >= 0 ? location.pathname.slice(0, marker) + '/surya-shanti' : '');
export const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const arrow = '<span class="link-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.3"/></svg></span>';

export function href(route) {
  if (window.__SURYA_OFFLINE__) return '#' + route;
  const [path, query] = route.split('?');
  if (!base) return route;
  return base + (path === '/' ? '/index.html' : path.replace(/\/$/, '') + '/index.html') + (query ? '?' + query : '');
}

export function link(route, label, className = 'text-link') {
  return `<a class="${escape(className)}" data-route="${escape(route)}" href="${escape(href(route))}">${label}${className.includes('text-link') || className.includes('button') ? arrow : ''}</a>`;
}

export function bookingLink(label = 'Check availability') {
  return `<a class="button booking-link" href="${bookingURL}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;
}

export function contactLink(topic, label = 'Enquire with our team') {
  return link('/contact?interest=' + encodeURIComponent(topic), label, 'button');
}

export function photograph(id) {
  const record = photos.find(photo => photo.id === Number(id));
  if (!record) throw new Error('Unavailable or excluded photograph: ' + id);
  return record;
}

export function imageURL(id, largest = false) {
  if (window.__SURYA_IMAGES__) return window.__SURYA_IMAGES__[id];
  const photo = photograph(id);
  const variant = largest ? photo.variants.at(-1) : photo.variants.find(variant => variant.width >= 1280) || photo.variants.at(-1);
  return base + '/images/' + variant.file;
}

export function image(id, {className = '', alt, eager = false, position = '50% 50%', sizes = '(max-width: 760px) 100vw, 65vw'} = {}) {
  const record = photograph(id);
  const responsive = window.__SURYA_IMAGES__ ? '' : `srcset="${record.variants.map(variant => base + '/images/' + variant.file + ' ' + variant.width + 'w').join(', ')}" sizes="${escape(sizes)}"`;
  return `<img class="${escape(className)}" src="${escape(imageURL(id))}" ${responsive} alt="${escape(alt || record.alt)}" width="${record.width}" height="${record.height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''} style="object-position:${escape(position)}">`;
}

export function zoomImage(id, caption = '', options = {}) {
  return `<figure class="zoom-figure"><button class="photo-zoom" type="button" data-photo="${id}" aria-label="Open photograph: ${escape(caption || photograph(id).alt)}">${image(id, options)}<span class="zoom-mark" aria-hidden="true">+</span></button>${caption ? `<figcaption class="caption">${caption}</figcaption>` : ''}</figure>`;
}

export function hero({imageId, title, kicker, description = '', position = '50% 50%', variant = ''}) {
  const photo = photograph(imageId);
  const mobileSize = Math.ceil(87 * photo.width / photo.height) + 'svh';
  return `<section class="page-hero ${variant === 'split' ? 'hero-split' : ''}">${image(imageId, {className:'hero-photo', eager:true, position, sizes: variant === 'split' ? '(max-width:760px) 100vw, 50vw' : `(max-width:760px) max(100vw, ${mobileSize}), 100vw`})}<div class="hero-content"><p class="eyebrow">${kicker}</p><h1>${title}</h1>${description ? `<p class="hero-description">${description}</p>` : ''}<a class="hero-scroll" href="#page-content">DISCOVER <span aria-hidden="true">↓</span></a></div></section>`;
}

export function sectionHead(kicker, title, copy = '') {
  return `<div class="section-head"><p class="eyebrow">${kicker}</p><h2>${title}</h2>${copy ? `<p class="section-copy">${copy}</p>` : ''}</div>`;
}
