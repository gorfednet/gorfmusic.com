import { test, expect } from '@playwright/test'

const canonicalRoutes = [
  { path: '/', heading: /^GORF$/i },
  { path: '/listen', heading: /^Listen$/ },
  { path: '/live', heading: /^Live Dates$/ },
  { path: '/collaborations', heading: /^Collaborations$/ },
  { path: '/services', heading: /^Services$/ },
  { path: '/contact', heading: /^Contact$/ },
]

test.describe('smoke', () => {
  for (const route of canonicalRoutes) {
    test(`${route.path} loads without fatal errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))

      const response = await page.goto(route.path)
      expect(response?.status()).toBeLessThan(400)
      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
      expect(errors, `page errors: ${errors.join('; ')}`).toEqual([])
    })
  }

  test('client navigation loads a lazy route', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Listen', exact: true })
      .click()

    await expect(page).toHaveURL(/\/listen$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Listen' })).toBeVisible()
    expect(errors, `page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('legacy music route redirects to listen', async ({ page }) => {
    await page.goto('/music')
    await expect(page).toHaveURL(/\/listen$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Listen' })).toBeVisible()
  })

  test('unknown route loads the lazy not-found page', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto('/not-a-real-page')
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible()
    expect(errors, `page errors: ${errors.join('; ')}`).toEqual([])
  })

  test('reduced motion keeps reveal content visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/services')

    const reveal = page.locator('[data-reveal]').first()
    await expect(reveal).toHaveAttribute('data-reveal', 'visible')
    await expect(reveal).toHaveCSS('opacity', '1')
  })

  test('missing IntersectionObserver keeps reveal content visible', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: undefined })
    })
    await page.goto('/services')

    const reveal = page.locator('[data-reveal]').first()
    await expect(reveal).toHaveAttribute('data-reveal', 'visible')
    await expect(reveal).toHaveCSS('opacity', '1')
  })
})
