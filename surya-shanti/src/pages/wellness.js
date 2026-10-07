import { image, hero, contactLink, link } from '../ui.js';
import './wellness.css';

// Treatment facts: official /spa and /facilities, reviewed 7 October 2026.
// Photos were opened individually. Several official menu thumbnails show an
// unrelated subject and are deliberately excluded from these treatment entries.
const treatments = [
  {
    title: 'Signature massage',
    detail: '90 minutes · Body & face',
    copy: 'A body and face massage with aromatic oils, and ninety minutes to let the day slow down.',
  },
  {
    title: 'Hot stone massage',
    detail: '60 minutes · Full body',
    copy: 'A sixty-minute full-body massage with hot stones, offered as part of our spa selection.',
  },
  {
    title: 'Lulur body scrub',
    detail: 'Indonesian tradition',
    copy: 'Discover Lulur, a full-body scrub rooted in a longstanding Indonesian tradition of body care.',
  },
  {
    title: 'Cream bath',
    detail: '60 minutes · Head, neck & shoulders',
    copy: 'A head, neck and shoulder massage with revitalising cream. Sixty minutes devoted to this traditional form of care.',
  },
  {
    title: 'Honeymoon ritual',
    detail: '90 minutes · Massage, scrub & flower bath',
    copy: 'A ninety-minute ritual combining a massage, body scrub and flower bath.',
  },
  {
    title: 'Manicure & pedicure',
    detail: 'Hands & feet',
    copy: 'Care for hands and feet, accompanied by a hand and foot massage.',
  },
  {
    title: 'Facial care',
    detail: 'Ask our team',
    copy: 'Facial care is also part of our spa selection. Speak with our team about the treatments available during your visit.',
  },
];

function photo(id, alt, caption, className = '', position = '50% 50%') {
  return `<figure class="wellness-figure ${className}">
    ${image(id, { className: 'wellness-photo', alt, position, sizes: '(max-width: 760px) 100vw, 80vw' })}
    ${caption ? `<figcaption class="caption">${caption}</figcaption>` : ''}
  </figure>`;
}

function treatmentMenu() {
  return treatments.map((treatment, index) => `<details class="spa-treatment"${index === 0 ? ' open' : ''}>
    <summary>
      <span class="spa-treatment-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
      <span class="spa-treatment-label">
        <span class="spa-treatment-name">${treatment.title}</span>
        <span class="spa-treatment-meta">${treatment.detail}</span>
      </span>
      <span class="spa-treatment-toggle" aria-hidden="true"></span>
    </summary>
    <div class="spa-treatment-description"><p>${treatment.copy}</p></div>
  </details>`).join('');
}

export function spaPage() {
  return `<div class="wellness-page spa-page">
    ${hero({
      imageId: 58,
      kicker: 'Spa at Surya Shanti',
      title: 'A little time<br>to <em>be still.</em>',
      description: 'Aromatic oils. Traditional care. The quiet of Sidemen.',
      position: '55% 60%',
    })}

    <section id="page-content" class="section spa-slow-intro" aria-labelledby="spa-pause-title">
      <div class="container spa-pause-grid">
        <div class="wellness-editorial">
          <p class="eyebrow">The art of slowing down</p>
          <h2 id="spa-pause-title">Leave a little space<br>for <em>yourself.</em></h2>
          <p>Let the day unfold more gently. At Surya Shanti, traditional techniques and attentive therapists invite you to pause, unwind and enjoy a moment of care.</p>
          ${contactLink('Spa treatment', 'Enquire about a treatment')}
        </div>
        ${photo(64, 'Two guests in robes enjoy a quiet moment with cups in a timber pavilion', 'A quiet pause, surrounded by greenery.', 'spa-pause-photo', '38% 60%')}
      </div>
    </section>

    <section class="spa-signature-section" aria-labelledby="spa-signature-title">
      <div class="container spa-signature-heading">
        <div>
          <p class="eyebrow">The signature massage</p>
          <h2 id="spa-signature-title">Ninety minutes.<br><em>Nothing to rush.</em></h2>
        </div>
        <div class="spa-signature-note">
          <span class="spa-time-label">Body & face · 90 minutes</span>
          <p>Aromatic oils and the care of our therapists. An unhurried body and face massage at the heart of our spa selection.</p>
        </div>
      </div>
      ${photo(59, 'Two therapists give body massages in the open timber treatment pavilion', 'Body massage in the open timber pavilion.', 'spa-signature-photo', '50% 60%')}
      <div class="container spa-care-details">
        ${photo(47, 'A therapist massages a guest’s back with oil', 'Time devoted to attentive care.', 'spa-care-closeup', '50% 58%')}
        <div class="spa-care-thought">
          <p class="eyebrow">Thoughtful touches</p>
          <p class="wellness-display-copy">A calmer rhythm.<br>A moment to<br><em>reconnect.</em></p>
        </div>
        ${photo(60, 'A therapist gives a head massage beside the greenery of Sidemen', 'A moment during a head massage.', 'spa-care-head', '75% 60%')}
      </div>
    </section>

    <section class="section section-dark spa-menu-section" aria-labelledby="spa-treatments-title">
      <div class="container spa-menu-grid">
        <div class="spa-menu-intro">
          <p class="eyebrow">Explore the treatments</p>
          <h2 id="spa-treatments-title">Care, rooted<br>in <em>tradition.</em></h2>
          <p>From aromatic-oil massage to the Indonesian Lulur body scrub, choose a moment that feels right for you.</p>
          <p class="spa-menu-practical">Our team can help you explore the current treatment selection, prices and availability.</p>
          ${contactLink('Spa treatment', 'Ask the spa team')}
        </div>
        <div class="spa-treatment-list">${treatmentMenu()}</div>
      </div>
    </section>

    <section class="section spa-welcome-section" aria-labelledby="spa-welcome-title">
      <div class="container spa-welcome-grid">
        ${photo(57, 'Two uniformed spa staff greet guests with their palms together', 'A warm welcome at the spa.', 'spa-welcome-photo', '55% 52%')}
        <div class="wellness-editorial spa-welcome-copy">
          <p class="eyebrow">The people behind the care</p>
          <h2 id="spa-welcome-title">A warm welcome.<br><em>A gentle touch.</em></h2>
          <p>Our therapists bring skill and attention to each treatment. Here, taking care of you is part of the same thoughtful welcome that runs through your stay.</p>
          ${photo(63, 'Four members of the team greet the camera beside the garden and pool', 'The people behind the welcome.', 'spa-team-photo')}
        </div>
      </div>
    </section>

    <section class="section section-sand spa-final-section" aria-labelledby="spa-enquiry-title">
      <div class="container spa-final-grid">
        ${photo(56, 'Stone basins, carved wood, fresh towels and flowers in an open courtyard', 'Stone, carved wood and thoughtful details.', 'spa-stone-photo', '58% 60%')}
        <div class="wellness-editorial">
          <p class="eyebrow">Your moment of calm</p>
          <h2 id="spa-enquiry-title">Make room for<br><em>a little stillness.</em></h2>
          <p>Planning ahead or choosing a treatment during your stay? Get in touch to ask about the current selection and available appointments.</p>
          <div class="wellness-link-pair">
            ${contactLink('Spa treatment', 'Enquire about the spa')}
            ${link('/yoga', 'Discover yoga')}
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

export function yogaPage() {
  return `<div class="wellness-page yoga-page">
    ${hero({
      imageId: 7,
      kicker: 'Yoga in Sidemen',
      title: 'Breathe with<br><em>the valley.</em>',
      description: 'Sun salutations, movement and breathwork in the fresh air of Sidemen.',
      position: '50% 64%',
      variant: 'split',
    })}

    <section id="page-content" class="section yoga-practice-section" aria-labelledby="yoga-practice-title">
      <div class="container">
        <div class="yoga-practice-heading">
          <p class="eyebrow">The practice</p>
          <h2 id="yoga-practice-title">Movement. Breath.<br><em>A moment to reconnect.</em></h2>
          <p>Take time to turn your attention to the simple rhythm of movement and breath, with the valley around you.</p>
        </div>
        <div class="yoga-practice-notes">
          <div class="yoga-practice-note">
            <span class="yoga-practice-index" aria-hidden="true">I</span>
            <h3>Sun salutations</h3>
            <p>Welcome the day through the practice of sun salutations.</p>
          </div>
          <div class="yoga-practice-note">
            <span class="yoga-practice-index" aria-hidden="true">II</span>
            <h3>Asanas</h3>
            <p>Make space for movement and the practice of yoga postures.</p>
          </div>
          <div class="yoga-practice-note">
            <span class="yoga-practice-index" aria-hidden="true">III</span>
            <h3>Pranayama</h3>
            <p>Bring your attention back to the breath.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-sand yoga-guidance-section" aria-labelledby="yoga-guidance-title">
      <div class="container yoga-guidance-grid">
        ${photo(69, 'A man sits cross-legged on a yoga mat beside open doors and greenery', 'A seated practice, with the garden beyond.', 'yoga-guidance-photo', '60% 58%')}
        <div class="wellness-editorial yoga-guidance-copy">
          <p class="eyebrow">Yoga at Surya Shanti</p>
          <h2 id="yoga-guidance-title">With Wayan<br><em>and his team.</em></h2>
          <p>Our yoga experience brings together sun salutations, asanas and pranayama in the fresh air of the Sidemen Valley.</p>
          <p>Speak with our team about joining a class during your stay. We will help you explore availability and arrangements for your visit.</p>
          ${contactLink('Yoga class', 'Enquire about a yoga class')}
        </div>
      </div>
    </section>

    <section class="yoga-landscape-section" aria-labelledby="yoga-valley-title">
      ${photo(84, 'Mount Agung above the palms and green valley in warm sunlight', 'Mount Agung, beyond the green of Sidemen.', 'yoga-agung-photo', '50% 42%')}
      <div class="container yoga-valley-grid">
        <div class="wellness-editorial">
          <p class="eyebrow">The spirit of Sidemen</p>
          <h2 id="yoga-valley-title">A different<br><em>pace of life.</em></h2>
          <p>Rice terraces, village life and the presence of Mount Agung give Sidemen its own rhythm. Let that setting become part of your stay, whether you are practising yoga or simply taking it in.</p>
          ${link('/experiences', 'Explore Sidemen experiences')}
        </div>
        ${photo(81, 'A farmer works a flooded rice field with two cattle in the green Sidemen landscape', 'Life in the rice fields of Sidemen.', 'yoga-rice-photo', '55% 62%')}
      </div>
    </section>

    <section class="section section-dark yoga-final-section" aria-labelledby="yoga-enquiry-title">
      <div class="container yoga-final-inner">
        <p class="eyebrow">Find your moment</p>
        <h2 id="yoga-enquiry-title">Your stay,<br><em>at your own pace.</em></h2>
        <p>Ask us about yoga classes and how to include the experience in your visit to Surya Shanti.</p>
        <div class="wellness-link-pair">
          ${contactLink('Yoga class', 'Ask about a class')}
          ${link('/spa', 'Explore the spa')}
        </div>
      </div>
    </section>
  </div>`;
}
