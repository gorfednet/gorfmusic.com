import { test, expect } from '@playwright/test'

const canonicalRoutes = [
  { path: '/', heading: /^GORF$/i },
  { path: '/listen', heading: /^Listen$/ },
  { path: '/live', heading: /^Live Dates$/ },
  { path: '/collaborations', heading: /^Collaborations$/ },
  { path: '/services', heading: /^Services$/ },
  { path: '/contact', heading: /^Contact$/ },
]

async function fillContactForm(page: import('@playwright/test').Page) {
  await page.getByLabel(/^Name/).fill('Test User')
  await page.getByLabel(/^Email/).fill('test@example.com')
  await page.getByLabel(/^What's this about/).selectOption('general')
  await page
    .getByLabel(/^Message/)
    .fill('This message is long enough to be valid.')
}

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

  test('contact form sends the JSON boolean botcheck contract', async ({ page }) => {
    let requestBody = ''
    let contentType = ''
    await page.route('https://api.web3forms.com/submit', async (route) => {
      requestBody = route.request().postData() ?? ''
      contentType = route.request().headers()['content-type'] ?? ''
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.goto('/contact')
    const botcheck = page.locator('input[name="botcheck"]')
    await expect(botcheck).toHaveCount(1)
    await expect(botcheck).toBeHidden()
    await expect(botcheck).not.toBeChecked()
    await expect(page.locator('input[name="company_website"]')).toHaveCount(0)

    await fillContactForm(page)
    await page.waitForTimeout(2800)
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByRole('heading', { name: 'Message sent' })).toBeVisible()
    expect(contentType).toContain('application/json')
    const payload = JSON.parse(requestBody)
    expect(payload).toMatchObject({
      access_key: 'test-access-key-for-browser-tests',
      name: 'Test User',
      email: 'test@example.com',
      botcheck: false,
    })
    expect(payload.subject).toContain('[gorfmusic.com] General inquiry / Test User')
    expect(payload.message).toContain('Topic: General inquiry (general)')
  })

  test('contact form prevents duplicate in-flight requests', async ({ page }) => {
    let requestCount = 0
    await page.route('https://api.web3forms.com/submit', async (route) => {
      requestCount += 1
      await new Promise((resolve) => setTimeout(resolve, 250))
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      })
    })

    await page.goto('/contact')
    await fillContactForm(page)
    await page.waitForTimeout(2800)
    await page.locator('form').evaluate((form: HTMLFormElement) => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    await expect(page.getByRole('heading', { name: 'Message sent' })).toBeVisible()
    expect(requestCount).toBe(1)
  })

  test('contact form masks anti-spam errors and preserves values', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Honeypot Error. Botcheck field should be hidden and should not check.',
        }),
      })
    })

    await page.goto('/contact')
    await fillContactForm(page)
    await page.waitForTimeout(2800)
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByRole('alert')).toHaveText(
      'Could not verify your submission. Refresh the page and try again.',
    )
    await expect(page.getByLabel(/^Name/)).toHaveValue('Test User')
    await expect(page.getByLabel(/^Email/)).toHaveValue('test@example.com')
    await expect(page.getByLabel(/^What's this about/)).toHaveValue('general')
    await expect(page.getByLabel(/^Message/)).toHaveValue(
      'This message is long enough to be valid.',
    )
  })

  test('contact honeypot reads submitted DOM state without a change event', async ({
    page,
  }) => {
    let requestCount = 0
    await page.route('https://api.web3forms.com/submit', async (route) => {
      requestCount += 1
      await route.abort()
    })

    await page.goto('/contact')
    await page.locator('form').evaluate((form: HTMLFormElement) => {
      const botcheck = form.elements.namedItem('botcheck') as HTMLInputElement
      botcheck.checked = true
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    await expect(page.getByRole('heading', { name: 'Message sent' })).toBeVisible()
    expect(requestCount).toBe(0)
  })
})
