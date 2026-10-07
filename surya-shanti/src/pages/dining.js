import { image, hero, sectionHead, contactLink } from '../ui.js';
import './dining.css';

const foodSelection = [
  ['Our signature smoked duck', 'Prepared in a wood-fired oven and served with coconut vegetables and satay. A speciality of the Surya Shanti kitchen.'],
  ['The Balinese table d’hôtes', 'Coconut fish skewers, chicken in a banana leaf, satay with peanut sauce, corn fritters, green papaya soup and tofu curry: a selection of the dishes our kitchen shares.'],
  ['A French touch', 'Sweet-potato and spinach velouté, shredded pork, grilled aubergines and mango panna cotta are among our fusion-cuisine favourites.'],
  ['Something familiar', 'Pizza, spaghetti, club sandwiches, crêpes, house-made French fries and Caesar salad offer lighter meals and familiar favourites for younger guests.'],
];

const cocktails = [
  ['Shanti Special', 'Arak · ginger juice · mint leaves'],
  ['Special Healing', 'Cointreau · prosecco · lime'],
  ['Pink Lady', 'Grenadine · arak · lemon · orange juice'],
  ['Arak Atak', 'Arak · lime · Galliano · Sprite'],
  ['Margarita', 'Tequila · triple sec · lime'],
  ['Tropical Delight', 'Pineapple · mint · banana · milk · rum'],
];

export function diningPage() {
  return `<div class="dining-page">
    ${hero({ imageId: 30, title: 'At the table,<br><em>in Sidemen.</em>', kicker: 'Dining at Surya Shanti', description: 'Balinese ingredients. A French touch. A place to linger.', position: '50% 53%' })}

    <section id="page-content" class="section dining-kitchen" aria-labelledby="dining-kitchen-title">
      <div class="container dining-kitchen-grid">
        <div class="dining-kitchen-copy">
          <p class="eyebrow">The kitchen · Local flavours, personal touches</p>
          <h2 id="dining-kitchen-title">A Balinese heart.<br><em>A French touch.</em></h2>
          <div class="prose">
            <p>Our Balinese chefs bring local ingredients and French culinary know-how together, while keeping traditional island recipes close to the heart of the kitchen.</p>
            <p>Meals are served in a relaxed restaurant overlooking the pool and valley. Sit down, take in the green surroundings, and leave a little room for discovery.</p>
          </div>
          <a class="text-link dining-anchor" href="#taste-of-surya">Explore the flavours <span aria-hidden="true">↓</span></a>
        </div>
        <figure class="dining-chef-photo">
          ${image(10, { alt: 'A Surya Shanti chef holding a colourful platter of Balinese dishes in the garden', position: '50% 48%', sizes: '(max-width: 760px) 92vw, 42vw' })}
          <figcaption class="caption">From our kitchen, with a personal touch.</figcaption>
        </figure>
      </div>
    </section>

    <section class="dining-table-story section-sand" id="taste-of-surya" aria-labelledby="dining-table-title">
      <figure class="dining-platter-photo">
        ${image(34, { alt: 'Balinese dishes served in clay bowls on a banana-leaf-lined platter at Surya Shanti', sizes: '(max-width: 760px) 100vw, 61vw', position: '50% 50%' })}
        <figcaption class="caption">A selection from our Balinese table.</figcaption>
      </figure>
      <div class="dining-table-copy">
        <p class="eyebrow">The Balinese table</p>
        <h2 id="dining-table-title">A little of Bali,<br><em>on your plate.</em></h2>
        <p class="prose">Skewers, fragrant sauces, banana-leaf parcels and the warmth of a shared meal. Our table d’hôtes brings together a selection of Balinese dishes, alongside the kitchen’s fusion creations.</p>
        <p class="dining-table-note">The pleasure is in tasting a little of everything.</p>
      </div>
    </section>

    <section class="section dining-menu-section" aria-labelledby="dining-menu-title">
      <div class="container dining-menu-layout">
        <div class="dining-menu-intro">
          <p class="eyebrow">A selection from the kitchen</p>
          <h2 id="dining-menu-title">Flavours to<br><em>remember.</em></h2>
          <p class="prose">Balinese specialities and a French culinary influence meet at the same table.</p>
          ${contactLink('Dining', 'Ask about dining')}
        </div>
        <div class="dining-menu-ledger">
          ${foodSelection.map(([name, copy], index) => `<article class="dining-menu-row"><span class="dining-menu-number" aria-hidden="true">0${index + 1}</span><div><h3>${name}</h3><p>${copy}</p></div></article>`).join('')}
        </div>
      </div>
    </section>

    <section class="dining-breakfast section-sand" aria-labelledby="dining-breakfast-title">
      <div class="container dining-breakfast-head">
        <div><p class="eyebrow">Breakfast at Surya Shanti</p><h2 id="dining-breakfast-title">Mornings,<br><em>unrushed.</em></h2></div>
        <p class="prose">A cup of tea, fresh fruit, and time to enjoy the garden. Choose an American or Indonesian breakfast before the day unfolds.</p>
      </div>
      <figure class="dining-breakfast-photo">
        ${image(21, { alt: 'Guests enjoying tea, juice and breakfast at a wooden table in Surya Shanti’s garden restaurant', sizes: '100vw', position: '50% 53%' })}
      </figure>
      <div class="container dining-breakfast-choices">
        <article><span class="eyebrow">01 / Breakfast</span><h3>American</h3><p>Scrambled or poached eggs, fruit juice, pancake, yogurt, toast, Balinese cakes and fresh fruit.</p></article>
        <article><span class="eyebrow">02 / Breakfast</span><h3>Indonesian</h3><p>Fried rice or fried noodles, bubur, Balinese cakes, fruit juice and fresh fruit.</p></article>
      </div>
    </section>

    <section class="section dining-made-here" aria-labelledby="dining-made-title">
      <div class="container dining-made-grid">
        <div>
          <p class="eyebrow">Made here, with care</p>
          <h2 id="dining-made-title">The small things<br><em>make it ours.</em></h2>
          <div class="prose"><p>We make our own bread and marmalades, and our own ice cream with fruit from the garden. These are the personal touches that make a meal feel a little more like home.</p><p>Balinese cakes bring another little taste of the island to breakfast.</p></div>
        </div>
        <figure class="dining-cakes-photo">${image(35, { alt: 'A basket of small cakes on a banana leaf, decorated with a frangipani flower at Surya Shanti', sizes: '(max-width: 760px) 92vw, 49vw' })}<figcaption class="caption">A basket of little breakfast treats.</figcaption></figure>
      </div>
    </section>

    <section class="dining-bar section-dark" aria-labelledby="dining-bar-title">
      <div class="container dining-bar-head">
        <div><p class="eyebrow">Buddha Bar</p><h2 id="dining-bar-title">Something<br><em>to sip.</em></h2></div>
        <div class="prose"><p>Settle into our lounge for an arak speciality, a classic Mojito, a fruit juice or an herbal drink.</p><p>A reclining Buddha, a game of chess, darts and the team’s favourite music create a leisurely way to end the day.</p></div>
      </div>
      <figure class="dining-bar-photo">${image(18, { alt: 'The open-sided thatched lounge at Surya Shanti, with wooden sofas, wicker chairs and a reclining Buddha', sizes: '100vw', position: '50% 52%' })}</figure>
      <div class="container dining-cocktail-layout"><p class="eyebrow">From the cocktail selection</p><dl class="dining-cocktails">${cocktails.map(([name, ingredients]) => `<div><dt>${name}</dt><dd>${ingredients}</dd></div>`).join('')}</dl></div>
    </section>

    <section class="section dining-people" aria-labelledby="dining-people-title">
      <div class="container dining-people-grid">
        <figure class="dining-team-photo">${image(54, { alt: 'Members of Surya Shanti’s kitchen team standing in the tropical garden', position: '50% 43%', sizes: '(max-width: 760px) 92vw, 41vw' })}</figure>
        <div><p class="eyebrow">The people behind the plate</p><h2 id="dining-people-title">A kitchen with<br><em>a personal touch.</em></h2><div class="prose"><p>Our Balinese team shares the recipes, flavours and generous spirit of the island. Their local knowledge is at the heart of both the restaurant and our cooking classes.</p><p>For current menu details or dietary preferences, talk to our team.</p></div>${contactLink('Dining', 'Talk to the team')}</div>
      </div>
    </section>

    <section class="dining-cooking section-sand" aria-labelledby="dining-cooking-title">
      <div class="dining-cooking-copy"><p class="eyebrow">The Balinese cooking class</p><h2 id="dining-cooking-title">Take the flavours<br><em>home.</em></h2><div class="prose"><p>Visit Sidemen’s local market, then join our Balinese chef to prepare traditional dishes in our kitchen.</p><p>Sate lilit, green papaya salad and corn fritters are among the recipes you can discover. Share the lunch you have cooked, and take a recipe booklet home with you.</p></div>${contactLink('Cooking class', 'Ask about a cooking class')}</div>
      <figure class="dining-cooking-photo">${image(72, { alt: 'Surya Shanti’s rustic Balinese cooking kitchen with clay bowls, ingredients and a wood-fired stove', sizes: '(max-width: 760px) 100vw, 44vw', position: '50% 57%' })}<figcaption class="caption">Our Balinese kitchen, ready for discovery.</figcaption></figure>
    </section>

    <section class="section dining-invitation"><div class="container">${sectionHead('Meet us at the table', 'A taste of<br><em>Surya Shanti.</em>', 'Share your dining questions or plans for a cooking class with our team.')}<div class="dining-invitation-action">${contactLink('Dining', 'Start a conversation')}</div></div></section>
  </div>`;
}
