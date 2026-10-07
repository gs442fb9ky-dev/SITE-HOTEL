import { test, expect } from '@playwright/test';

for (const [route, cta, interest] of [
  ['/spa', 'Enquire about a treatment', 'Spa treatment'],
  ['/yoga', 'Enquire about a yoga class', 'Yoga class'],
]) {
  test(`${route} enquiry carries its interest to the contact form`, async ({ page }) => {
    await page.goto(route);
    await page.getByRole('link', { name: cta, exact: true }).click();

    await expect(page).toHaveURL(new RegExp(`/contact\\?interest=${encodeURIComponent(interest)}$`));
    await expect(page.getByLabel('I’d like to ask about')).toHaveValue(interest);
    await expect(page.getByRole('button', { name: 'Prepare my enquiry' })).toBeVisible();
  });
}

test('enquiry rejects reversed dates and prepares an exact draft without sending', async ({ page }) => {
  await page.goto('/contact?interest=Spa%20treatment', { waitUntil: 'networkidle' });
  await page.getByLabel('Your name', { exact: true }).fill('Aline O’Connor & Co');
  await page.getByLabel('Your email', { exact: true }).fill('aline@example.com');
  const message = 'Could you confirm the spa options for our visit?\nWe would like a massage & facial.';
  await page.getByLabel('Your message', { exact: true }).fill(message);
  await page.getByLabel('Arrival, if known').fill('2026-11-05');
  await page.getByLabel('Departure, if known').fill('2026-11-04');
  const prepareButton = page.getByRole('button', { name: 'Prepare my enquiry' });
  await prepareButton.scrollIntoViewIfNeeded();
  await page.waitForLoadState('networkidle');

  const requests = [];
  const popups = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url() }));
  page.on('popup', popup => popups.push(popup));
  const originalUrl = page.url();

  await prepareButton.click();
  await expect(page.getByRole('status')).toHaveText('Please choose a departure date after your arrival.');
  await expect(page.locator('#enquiry-result')).toBeHidden();
  await expect(page.locator('#email-draft')).not.toHaveAttribute('href');

  await page.getByLabel('Departure, if known').fill('2026-11-10');
  await prepareButton.click();
  await expect(page.getByRole('status')).toHaveText('Your enquiry is ready to review. It has not been sent.');
  await expect(page.locator('#enquiry-result')).toBeVisible();

  const draft = new URL(await page.getByRole('link', { name: 'Open your email draft' }).getAttribute('href'));
  expect(draft.protocol).toBe('mailto:');
  expect(draft.pathname).toBe('reservation@suryashantivilla.com');
  expect([...draft.searchParams.keys()]).toEqual(['subject', 'body']);
  expect(draft.searchParams.get('subject')).toBe('Surya Shanti enquiry — Spa treatment');
  expect(draft.searchParams.get('body')).toBe([
    'Hello Surya Shanti team,',
    '',
    message,
    '',
    'Name: Aline O’Connor & Co',
    'Email: aline@example.com',
    'Interest: Spa treatment',
    'Arrival: 2026-11-05',
    'Departure: 2026-11-10',
  ].join('\n'));
  // The visitor must explicitly open and send the draft themselves.
  await expect(page).toHaveURL(originalUrl);
  expect(popups).toHaveLength(0);
  expect(requests).toEqual([]);
});

test('contact interest remains text when the query contains HTML and quotes', async ({ page }) => {
  const payload = '"><img data-injection-probe src="/interest-injection-probe" onerror="window.__interestInjection=1"><input value="Spa & Yoga';
  const probeRequests = [];
  page.on('request', request => {
    if (new URL(request.url()).pathname === '/interest-injection-probe') probeRequests.push(request.url());
  });

  await page.goto('/contact?interest=' + encodeURIComponent(payload), { waitUntil: 'networkidle' });
  const input = page.getByLabel('I’d like to ask about');
  await expect(input).toHaveValue(payload);
  await input.focus();
  await expect(page.locator('[data-injection-probe]')).toHaveCount(0);
  expect(await page.evaluate(() => window.__interestInjection)).toBeUndefined();
  expect(probeRequests).toEqual([]);
});

test('designer credit survives internal navigation and browser Back', async ({ page }) => {
  await page.goto('/#name=Sarah%20Castel');
  const credit = 'Website concept and design by Sarah Castel · For evaluation only';
  await expect(page.locator('#concept-credit')).toHaveText(credit);

  await page.getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Gallery', exact: true }).click();
  await expect(page.locator('.gallery-page')).toBeVisible();
  await expect(page.locator('#concept-credit')).toHaveText(credit);

  await page.goBack();
  await expect(page.locator('.home-page')).toBeVisible();
  await expect(page.locator('#concept-credit')).toHaveText(credit);
});
