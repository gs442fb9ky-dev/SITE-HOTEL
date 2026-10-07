import { test, expect } from '@playwright/test';

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the menu opens, closes with Escape and takes the guest to the gallery', async ({ page }) => {
    await page.goto('/');
    const menuButton = page.getByRole('button', { name: 'Menu', exact: true });
    const mobileNavigation = page.getByRole('navigation', { name: 'Mobile navigation' });

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.getByRole('link', { name: 'Gallery', exact: true })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(mobileNavigation).toBeHidden();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toBeFocused();

    await menuButton.click();
    await mobileNavigation.getByRole('link', { name: 'Gallery', exact: true }).click();
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('in photographs.');
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('Photograph gallery', () => {
  test('each filter announces the number of photographs actually displayed', async ({ page }) => {
    await page.goto('/gallery');
    const filters = page.getByRole('group', { name: 'Filter photographs' });
    const gallery = page.getByRole('region', { name: 'Photograph gallery' });
    const visiblePhotographs = gallery.getByRole('button', { name: /^Open photograph:/ });
    const announcement = gallery.locator('[aria-live="polite"]');
    const allCount = await visiblePhotographs.count();
    expect(allCount).toBeGreaterThan(0);

    for (const label of ['Rooms & villas', 'Pools & gardens', 'Spa', 'Yoga', 'Dining', 'Sidemen', 'Our story']) {
      await filters.getByRole('button', { name: label, exact: true }).click();
      await expect(filters.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
      await expect(filters.getByRole('button', { name: 'All photographs', exact: true })).toHaveAttribute('aria-pressed', 'false');
      const count = await visiblePhotographs.count();
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(allCount);
      await expect(announcement).toHaveText(`${count} photographs`);
    }

    await filters.getByRole('button', { name: 'All photographs', exact: true }).click();
    await expect(visiblePhotographs).toHaveCount(allCount);
    await expect(announcement).toHaveText(`${allCount} photographs`);
    await expect(filters.getByRole('button', { name: 'All photographs', exact: true })).toHaveAttribute('aria-pressed', 'true');
  });

  test('the photograph viewer follows the selected filter and supports keyboard navigation and return focus', async ({ page }) => {
    await page.goto('/gallery');
    await page.getByRole('group', { name: 'Filter photographs' }).getByRole('button', { name: 'Rooms & villas', exact: true }).click();
    const gallery = page.getByRole('region', { name: 'Photograph gallery' });
    const photographs = gallery.getByRole('button', { name: /^Open photograph:/ });
    const firstPhotograph = photographs.first();
    const firstDescription = await firstPhotograph.getByRole('img').getAttribute('alt');
    const secondDescription = await photographs.nth(1).getByRole('img').getAttribute('alt');
    const lastDescription = await photographs.last().getByRole('img').getAttribute('alt');

    await firstPhotograph.click();
    const viewer = page.getByRole('dialog', { name: 'Photograph viewer' });
    const fullPhotograph = viewer.getByRole('img');
    await expect(viewer).toBeVisible();
    await expect(fullPhotograph).toHaveAttribute('alt', firstDescription);
    await expect(viewer.getByText(firstDescription, { exact: true })).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(fullPhotograph).toHaveAttribute('alt', secondDescription);
    await page.keyboard.press('ArrowLeft');
    await expect(fullPhotograph).toHaveAttribute('alt', firstDescription);
    await page.keyboard.press('ArrowLeft');
    await expect(fullPhotograph).toHaveAttribute('alt', lastDescription);

    await page.keyboard.press('Escape');
    await expect(viewer).toBeHidden();
    await expect(firstPhotograph).toBeFocused();
    await expect(page.getByRole('group', { name: 'Filter photographs' }).getByRole('button', { name: 'Rooms & villas', exact: true })).toHaveAttribute('aria-pressed', 'true');
  });
});

test('each room has its own page and browser Back returns to the room collection', async ({ page }) => {
  const rooms = [
    ['Suite Agung View', 'agung-view'],
    ['Suite Agung Pool View', 'agung-pool-view'],
    ['Deluxe Room Valley View', 'deluxe-valley-view'],
    ['Mezzanine Family Villa', 'mezzanine-family-villa'],
    ['Joglo Saraswati', 'joglo-saraswati'],
  ];
  await page.goto('/rooms');

  for (const [title, slug] of rooms) {
    const discoverRoom = page.getByRole('link', { name: `Discover ${title}`, exact: true });
    await discoverRoom.click();
    await expect(page).toHaveURL(new RegExp(`/rooms/${slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);

    await page.goBack();
    await expect(page).toHaveURL(/\/rooms$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('be yourself.');
    await expect(page.getByRole('link', { name: `Discover ${title}`, exact: true })).toBeVisible();
  }
});
