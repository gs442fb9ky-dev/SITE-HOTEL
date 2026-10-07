import { image, hero, link, contactLink } from '../ui.js';
import './story.css';

const photo = (id, alt, className = '', caption = '', position = '50% 50%') => `
  <figure class="story-photo ${className}">
    ${image(id, { alt, className: 'story-picture', position })}
    ${caption ? `<figcaption class="story-caption">${caption}</figcaption>` : ''}
  </figure>`;

export function storyPage() {
  return `
  <div class="story-page">
    <div class="story-opening">
      ${hero({
        imageId: 85,
        kicker: 'OUR STORY · SIDEMEN, BALI',
        title: 'It began with<br><em>friendship.</em>',
        description: 'Three women. A shared love of Bali. A dream of creating a place to welcome you.',
        position: '50% 42%',
        variant: 'split',
      })}
    </div>

    <section class="story-introduction story-shell" aria-labelledby="story-begins-title">
      <div class="story-section-label"><span>01 / THE STORY BEGINS</span><span>2000</span></div>
      <div class="story-intro-grid">
        <h2 id="story-begins-title">Three women.<br><em>One shared dream.</em></h2>
        <div class="story-copy">
          <p>Surya Shanti grew from the friendship of Ibu Ati from Bali, Pauline from the Philippines and Sylvie from France. What brought their vision together was a shared passion for Bali, and the wish to create a place where they could share it with others.</p>
          <p>The hotel’s story begins with that friendship. Before the villas, the gardens and the welcome, there was a dream.</p>
        </div>
      </div>
      <dl class="story-three-women" aria-label="The three women at the beginning of Surya Shanti’s story">
        <div><dt>Ibu Ati</dt><dd>BALI</dd></div>
        <div><dt>Pauline</dt><dd>THE PHILIPPINES</dd></div>
        <div><dt>Sylvie</dt><dd>FRANCE</dd></div>
      </dl>
      <ol class="story-timeline" aria-label="Four chapters from Surya Shanti’s official history">
        <li><span class="story-timeline-year">2000</span><span>From friendship</span></li>
        <li><span class="story-timeline-year">2010</span><span>A dream comes true</span></li>
        <li><span class="story-timeline-year">2012</span><span>Pasraman Vidya Giri</span></li>
        <li><span class="story-timeline-year">2021</span><span>Caring for the team</span></li>
      </ol>
    </section>

    <section class="story-birth story-shell" aria-labelledby="story-birth-title">
      <div class="story-chapter-copy">
        <p class="eyebrow">02 / A DREAM COMES TRUE · 2010</p>
        <h2 id="story-birth-title">A place imagined.<br><em>A place brought to life.</em></h2>
        <div class="story-copy">
          <p>Alongside their families, the three women worked for years to bring their project to life.</p>
          <p>In 2010, Surya Shanti was inaugurated in the company of close friends from around the world. Their shared dream had become a place to welcome others.</p>
        </div>
        <span class="story-margin-note">A friendship at the heart of the place.</span>
      </div>
      <div class="story-birth-image">
        <span class="story-year-mark" aria-hidden="true">2010</span>
        ${photo(86, 'An aerial view of Surya Shanti’s thatched villas and pool in a green valley', 'story-photo-square', 'The place at the heart of a shared dream.')}
      </div>
    </section>

    <section class="story-sidemen" aria-labelledby="story-sidemen-title">
      <div class="story-shell">
        <div class="story-place-heading">
          <p class="eyebrow">03 / A DEEP CONNECTION TO SIDEMEN</p>
          <h2 id="story-sidemen-title">A love of Bali.<br><em>A connection to its people.</em></h2>
        </div>
        ${photo(84, 'Mount Agung rising above palm trees and greenery, with soft pink light on its slopes', 'story-photo-landscape', 'Mount Agung. The presence that shapes the valley.', '50% 46%')}
        <div class="story-place-copy story-copy">
          <p>Rice terraces, the presence of Mount Agung and the living traditions of Sidemen form the setting for Surya Shanti. Sharing a passion for Bali and Sidemen is one of the values at the heart of the hotel.</p>
          <p>So is the wish to encourage responsible tourism that benefits the Balinese community — and to welcome guests as friends.</p>
        </div>
        <div class="story-local-images">
          ${photo(81, 'A person working a wet rice field with two cattle, surrounded by Sidemen’s green hills', 'story-local-landscape', 'The everyday rhythms of Sidemen.')}
          ${photo(83, 'Three smiling women seated together in orange, yellow and turquoise traditional clothing', 'story-local-portrait', 'Faces of Sidemen.')}
        </div>
      </div>
    </section>

    <section class="story-community story-shell" aria-labelledby="story-community-title">
      <div class="story-section-label"><span>04 / SHARING WITH THE COMMUNITY</span><span>2012</span></div>
      <div class="story-community-heading">
        <h2 id="story-community-title">Learning together.<br><em>Keeping traditions alive.</em></h2>
        <div class="story-copy">
          <p>In 2012, Ibu Ati founded the Pasraman Vidya Giri association. It brings the children of Sidemen together to learn, explore their potential and develop respect for nature and the environment.</p>
        </div>
      </div>
      ${photo(75, 'Children and adults reading together, with children practising movement in the background at Pasraman Vidya Giri', 'story-photo-community', 'Pasraman Vidya Giri · Sidemen')}
      <div class="story-community-detail">
        <div class="story-community-text">
          <p class="eyebrow">PASRAMAN VIDYA GIRI</p>
          <div class="story-copy">
            <p>The association’s activities include gamelan, Balinese dance, yoga, meditation and shared meals.</p>
            <p>Surya Shanti supports its work and invites guests to discover Balinese arts through visits. Contact the hotel to learn about current arrangements.</p>
          </div>
          ${contactLink('Pasraman Vidya Giri', 'Ask about visiting Pasraman')}
        </div>
        <div class="story-values-image">
          ${photo(88, 'A group seated together with joined hands and bowls of flowers at the entrance of a building', '', 'A moment of togetherness.')}
          <p class="story-values-line">Respect for the place.<br><em>Care for its people.</em></p>
        </div>
      </div>
    </section>

    <section class="story-care" aria-labelledby="story-care-title">
      <div class="story-shell story-care-grid">
        ${photo(87, 'A smiling group photographed in front of a carved entrance with yellow ceremonial umbrellas', '', 'The people who care for Surya Shanti.')}
        <div class="story-care-copy">
          <p class="eyebrow">05 / CARING FOR THE TEAM · 2021</p>
          <h2 id="story-care-title">The people<br><em>behind the place.</em></h2>
          <div class="story-copy">
            <p>During the pandemic, when guests were absent, Surya Shanti continued to support its team with a minimum wage and food.</p>
            <p>In return, the team cared for the property. Recorded in the hotel’s story in 2021, this chapter is a reminder that Surya Shanti’s welcome is made by people.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="story-hosts story-shell" aria-labelledby="story-hosts-title">
      <div class="story-hosts-copy">
        <p class="eyebrow">06 / A WELCOME ROOTED IN FRIENDSHIP</p>
        <h2 id="story-hosts-title">Joël &amp; Sylvie.<br><em>A heartfelt welcome.</em></h2>
        <div class="story-copy">
          <p>Joël and Sylvie welcome guests with warmth, alongside the Balinese team who help make Surya Shanti feel like home.</p>
          <p>The spirit of that first friendship lives in the way the hotel describes its welcome: an invitation to share a place, a passion for Bali and the pleasure of being together.</p>
        </div>
      </div>
      ${photo(90, 'Joël and Sylvie smiling together in the garden at Surya Shanti', 'story-hosts-portrait', 'Joël & Sylvie')}
    </section>

    <section class="story-team story-shell" aria-labelledby="story-team-title">
      <div class="story-team-heading">
        <div><p class="eyebrow">THE SURYA SHANTI TEAM</p><h2 id="story-team-title">The warmth<br><em>of a shared welcome.</em></h2></div>
        <p class="story-team-copy">A place shaped by friendship, and brought to life by the people who welcome you.</p>
      </div>
      ${photo(91, 'The Surya Shanti team smiling together beneath a thatched roof, with the garden behind them', 'story-team-portrait', 'The Surya Shanti team.')}
    </section>

    <section class="story-finale" aria-label="The Surya Shanti philosophy">
      <div class="story-shell story-finale-grid">
        ${photo(0, 'Surya Shanti’s villas and pool surrounded by tropical greenery', 'story-finale-image')}
        <div class="story-finale-copy">
          <p class="eyebrow">THE SURYA SHANTI PHILOSOPHY</p>
          <blockquote>Come as a guest,<br><em>leave as a family</em></blockquote>
          <p>Surya, the sun. Shanti, the peace.<br>A place to share both.</p>
          ${link('/contact', 'Start a conversation')}
        </div>
      </div>
    </section>
  </div>`;
}
