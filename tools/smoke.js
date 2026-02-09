// Prefer local playwright installation under react-app/node_modules for deterministic resolution
const { chromium } = require('../react-app/node_modules/playwright');

(async () => {
  const base = 'http://localhost:5174'
  const results = { reachable: false, phone: {}, email: {}, layout: {} }
  const browser = await chromium.launch()
  const page = await browser.newPage()
  try {
    await page.goto(base + '/offer/consult', { waitUntil: 'domcontentloaded', timeout: 10000 })
    results.reachable = true

    // Phone input
    const phone = page.locator('input[type="tel"]')
    if (await phone.count() === 0) {
      results.phone.present = false
    } else {
      results.phone.present = true
      await phone.fill('123')
      await page.click('body')
      // wait a moment for validation
      await page.waitForTimeout(200)
      const phoneAlert = await page.locator('p[role="alert"]:has-text("Nieprawidłowy numer telefonu")')
      results.phone.invalidShown = (await phoneAlert.count()) > 0

      await phone.fill('123456789')
      await page.click('body')
      await page.waitForTimeout(200)
      const phoneAlertAfter = await page.locator('p[role="alert"]:has-text("Nieprawidłowy numer telefonu")')
      results.phone.invalidShownAfterValid = (await phoneAlertAfter.count()) > 0
    }

    // Email input
    const email = page.locator('input[type="email"]')
    if (await email.count() === 0) {
      results.email.present = false
    } else {
      results.email.present = true
      await email.fill('a@b')
      await page.click('body')
      await page.waitForTimeout(200)
      const emailAlert = await page.locator('p[role="alert"]:has-text("Nieprawidłowy adres e-mail")')
      results.email.invalidShown = (await emailAlert.count()) > 0

      await email.fill('test@example.com')
      await page.click('body')
      await page.waitForTimeout(200)
      const emailAlertAfter = await page.locator('p[role="alert"]:has-text("Nieprawidłowy adres e-mail")')
      results.email.invalidShownAfterValid = (await emailAlertAfter.count()) > 0
    }

    // Layout: date and time inputs and container class
    const dateInput = page.locator('input[type="date"]')
    const timeInput = page.locator('input[type="time"]')
    results.layout.datePresent = (await dateInput.count()) > 0
    results.layout.timePresent = (await timeInput.count()) > 0
    if (results.layout.datePresent) {
      const container = await dateInput.locator('xpath=ancestor::div[contains(@class, "flex")]').first()
      const classAttr = container ? await container.getAttribute('class') : null
      results.layout.containerClass = classAttr
      results.layout.usesResponsiveRow = classAttr ? classAttr.includes('sm:flex-row') || classAttr.includes('flex') : false
    }

  } catch (e) {
    results.error = String(e)
  } finally {
    await browser.close()
    console.log(JSON.stringify(results, null, 2))
    process.exit(0)
  }
})()
