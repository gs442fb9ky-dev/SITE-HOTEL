import { image, link, hero, contactLink } from '../ui.js';
import './experiences.css';

export function experiencesPage() {
  return `<div class="experiences-page">
    ${hero({
      imageId: 81,
      kicker: 'Experiences · Sidemen, Bali',
      title: 'Days shaped<br>by <em>Sidemen.</em>',
      description: 'Walk the rice fields, cook with our chef and discover the traditions our Balinese team is happy to share.',
      position: '50% 56%',
    })}

    <section class="section exp-introduction">
      <div class="container exp-intro-grid">
        <div>
          <p class="eyebrow">Beyond the villa</p>
          <h2>A place to discover,<br><em>at your own pace.</em></h2>
        </div>
        <div class="prose exp-intro-copy">
          <p>Sidemen is a landscape of rice terraces, village paths and living traditions. Spending time here is also a chance to meet the people who know it best.</p>
          <p>Our Balinese team invites you to explore that connection: on a walk, around the cooking table or in a quiet moment of morning prayer. Ask us about the experiences available during your stay.</p>
          ${contactLink('Experiences in Sidemen', 'Plan your time in Sidemen')}
        </div>
      </div>
    </section>

    <section class="section exp-walking" aria-labelledby="exp-walking-title">
      <div class="container exp-walk-grid">
        <div class="exp-walk-media">
          <figure class="exp-walk-main">
            ${image(27, { alt: 'Guests walking through a flooded rice field with a member of the Balinese team', sizes: '(max-width: 700px) 64vw, 34vw' })}
          </figure>
          <figure class="exp-walk-detail">
            ${image(73, { alt: 'A walker among the green rice fields and wooded hills of Sidemen', sizes: '(max-width: 700px) 36vw, 20vw' })}
          </figure>
          <p class="caption exp-walk-caption">The valley, seen from its paths.</p>
        </div>
        <div class="prose exp-walk-copy">
          <p class="eyebrow">01 / Walking &amp; trekking</p>
          <h2 id="exp-walking-title">Follow the paths.<br><em>Meet the valley.</em></h2>
          <p>Step into the rice fields, walk through the jungle and discover the villages around Sidemen with our Balinese team.</p>
          <p>With local guidance, the landscape becomes a way to discover the culture and traditions of the valley. Talk to the team about a walk that suits your interests.</p>
          ${contactLink('Walking and trekking', 'Ask about a guided walk')}
        </div>
      </div>
    </section>

    <section class="section section-dark exp-cooking" aria-labelledby="exp-cooking-title">
      <div class="container">
        <div class="exp-cooking-heading">
          <p class="eyebrow">02 / Balinese cooking</p>
          <h2 id="exp-cooking-title">From the market<br><em>to your table.</em></h2>
          <p class="exp-section-intro">A visit to Sidemen’s local market. A lesson with our Balinese chef. And a lunch made by you.</p>
        </div>
        <div class="exp-cook-grid">
          <figure class="exp-cook-kitchen">
            ${image(72, { alt: 'Ingredients, utensils and Balinese dishes laid out in the open-air cooking space', sizes: '(max-width: 760px) 92vw, 46vw' })}
            <figcaption class="caption">A table ready for the cooking class.</figcaption>
          </figure>
          <div class="exp-cook-story">
            <div class="prose">
              <p>The experience begins at the local market before returning for a cooking class with our chef. Learn to prepare Balinese dishes, then sit down to enjoy the food you have made.</p>
              <p>The dishes described by our chef include <em>sate lilit</em> — coconut and chicken skewers — green papaya salad and corn fritters. You leave with a recipe booklet to bring a little of Bali into your own kitchen.</p>
              ${contactLink('Balinese cooking class', 'Ask about a cooking class')}
            </div>
            <figure class="exp-cook-chef">
              ${image(10, { alt: 'Surya Shanti’s chef presenting a platter of Balinese food in the garden', sizes: '(max-width: 760px) 55vw, 25vw' })}
              <figcaption class="caption">Food, shared with a warm welcome.</figcaption>
            </figure>
          </div>
        </div>
        <div class="exp-cook-moments">
          <figure class="exp-cook-guests">
            ${image(6, { alt: 'The chef and guests smiling around a table of Balinese dishes after cooking', sizes: '(max-width: 760px) 37vw, 28vw' })}
          </figure>
          <figure class="exp-cook-food">
            ${image(34, { alt: 'A platter of colourful Balinese dishes served in small bowls on a banana leaf', sizes: '(max-width: 760px) 55vw, 51vw' })}
          </figure>
          <p class="exp-cook-note">The pleasure of learning.<br><em>The pleasure of sharing.</em></p>
        </div>
      </div>
    </section>

    <section class="section exp-prayer" aria-labelledby="exp-prayer-title">
      <div class="container exp-prayer-grid">
        <div class="prose exp-prayer-copy">
          <p class="eyebrow">03 / Morning prayer</p>
          <h2 id="exp-prayer-title">A quiet invitation<br><em>to understand.</em></h2>
          <p>You may join our team for their morning prayer at the temple. It is a moment to discover the beliefs and traditions they are happy to share with you.</p>
          <p>Approach it as a guest, with attention and respect. Ask the team about joining and follow their guidance.</p>
          ${contactLink('Morning prayer', 'Ask the team about joining')}
        </div>
        <div class="exp-prayer-media">
          <figure class="exp-prayer-temple">
            ${image(66, { alt: 'A participant at the temple beside flowers and offerings for prayer', sizes: '(max-width: 760px) 54vw, 30vw' })}
          </figure>
          <figure class="exp-prayer-offering">
            ${image(70, { alt: 'Participants praying with palms together at the temple', sizes: '(max-width: 760px) 40vw, 22vw' })}
          </figure>
          <p class="caption">A tradition shared by the people who practise it.</p>
        </div>
      </div>
    </section>

    <section class="section section-sand exp-community" aria-labelledby="exp-community-title">
      <div class="container">
        <div class="exp-community-heading">
          <div>
            <p class="eyebrow">04 / Pasraman Vidya Giri</p>
            <h2 id="exp-community-title">A connection<br><em>that reaches further.</em></h2>
          </div>
          <div class="prose">
            <p>Founded by Ibu Ati in 2012, Pasraman Vidya Giri brings the children of Sidemen together to learn and explore their potential, with respect for nature and the environment.</p>
            <p>Surya Shanti supports the association, whose activities include gamelan, Balinese dance, yoga, meditation and shared meals.</p>
          </div>
        </div>
        <figure class="exp-community-wide">
          ${image(74, { alt: 'Young Balinese dancers in traditional dress holding offerings outdoors', sizes: '92vw', position: '50% 43%' })}
          <figcaption class="caption">Balinese arts and the connection to the Sidemen community.</figcaption>
        </figure>
        <div class="exp-community-grid">
          <figure class="exp-community-learning">
            ${image(75, { alt: 'Children and adults gathered together at Pasraman Vidya Giri', sizes: '(max-width: 760px) 92vw, 42vw' })}
          </figure>
          <div class="prose exp-community-copy">
            <h3>Visit with care.<br>Learn through exchange.</h3>
            <p>The hotel describes opportunities to visit Pasraman, meet the community and discover Balinese arts. It also describes a contribution to the association linked to visits.</p>
            <p>Ask our team about current arrangements and how your visit can support the association. The community and its work come first.</p>
            ${contactLink('Pasraman Vidya Giri', 'Ask about visiting Pasraman')}
            ${link('/our-story', 'Discover the people behind Surya Shanti')}
          </div>
        </div>
      </div>
    </section>

    <section class="section exp-more" aria-labelledby="exp-more-title">
      <div class="container exp-more-grid">
        <div>
          <p class="eyebrow">A little further afield</p>
          <h2 id="exp-more-title">More ways<br><em>to explore.</em></h2>
        </div>
        <div class="prose">
          <p>Curious about another side of Bali? Our team also lists rafting, excursions, village visits, scooter tours, cycling and encounters with local healers among the possibilities to ask about.</p>
          <p>Contact us to discuss what is currently available and which options might suit your stay.</p>
          ${contactLink('Other activities around Sidemen', 'Discuss the possibilities')}
        </div>
      </div>
    </section>

    <section class="section section-dark exp-slow" aria-labelledby="exp-slow-title">
      <div class="container">
        <div class="exp-slow-heading">
          <p class="eyebrow">Make room for a slower day</p>
          <h2 id="exp-slow-title">There is time<br><em>to simply be.</em></h2>
        </div>
        <div class="exp-slow-links">
          <div><span>01</span>${link('/yoga', 'Yoga', 'exp-next-link')}<p>Movement, breath and the fresh air of Sidemen.</p></div>
          <div><span>02</span>${link('/spa', 'Spa', 'exp-next-link')}<p>A quiet moment for rest and care.</p></div>
          <div><span>03</span>${link('/our-story', 'Our story', 'exp-next-link')}<p>The friendship and people at the heart of the villa.</p></div>
        </div>
      </div>
    </section>
  </div>`;
}
