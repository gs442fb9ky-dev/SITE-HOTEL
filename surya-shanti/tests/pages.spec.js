import { test, expect } from '@playwright/test';
import { routePaths } from '../src/routes.js';

// Names are checked against the official categories established during research,
// rather than derived from the same data used to render the page.
const officialRoomTitles = new Map([
  ['/rooms/agung-view', 'Suite Agung View'],
  ['/rooms/agung-pool-view', 'Suite Agung Pool View'],
  ['/rooms/deluxe-valley-view', 'Deluxe Room Valley View'],
  ['/rooms/mezzanine-family-villa', 'Mezzanine Family Villa'],
  ['/rooms/joglo-saraswati', 'Joglo Saraswati'],
]);

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test.describe(`Direct page access at ${viewport.width}px`, () => {
    test.use({ viewport, reducedMotion: 'reduce' });

    for (const route of routePaths) {
      test(`${route} loads its content and photographs`, async ({ page }) => {
        const scriptErrors = [];
        const photographFailures = [];
        page.on('pageerror', error => scriptErrors.push(error.message));
        page.on('requestfailed', request => {
          if (request.resourceType() === 'image') {
            photographFailures.push(`${request.url()}: ${request.failure()?.errorText}`);
          }
        });
        page.on('response', response => {
          if (response.request().resourceType() === 'image' && !response.ok()) {
            photographFailures.push(`${response.url()}: HTTP ${response.status()}`);
          }
        });

        const response = await page.goto(route);
        expect(response?.ok(), `The direct response for ${route}`).toBeTruthy();
        expect(new URL(page.url()).pathname).toBe(route);

        const main = page.locator('main');
        await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1);
        await expect(page.locator('.not-found')).toHaveCount(0);
        await page.evaluate(() => document.fonts.ready);

        const images = main.locator('img');
        expect(await images.count(), `${route} should contain real photographs`).toBeGreaterThan(0);
        for (const image of await images.all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(
            () => image.evaluate(element => element.complete && element.naturalWidth > 0),
            { message: `Photograph failed to load on ${route}: ${await image.getAttribute('src')}` },
          ).toBeTruthy();
        }

        await page.evaluate(() => window.scrollTo(0, 0));
        const contentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(contentWidth, `${route} should fit the ${viewport.width}px viewport`).toBeLessThanOrEqual(viewport.width);

        if (route === '/rooms') {
          await expect(page.locator('.room-card h2')).toHaveText([...officialRoomTitles.values()]);
        }
        if (officialRoomTitles.has(route)) {
          await expect(main.getByRole('heading', { level: 1 })).toHaveText(officialRoomTitles.get(route));
        }

        expect(scriptErrors, `JavaScript errors on ${route}`).toEqual([]);
        expect(photographFailures, `Failed photograph requests on ${route}`).toEqual([]);
      });
    }
  });
}
