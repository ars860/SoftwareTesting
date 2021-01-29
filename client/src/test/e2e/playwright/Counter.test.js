import { chromium } from 'playwright'

describe('Playwright login e2e',  () => {
    it('type something in forms and get message', async () => {
        const browser = await chromium.launch()
        const page = await browser.newPage()
        await page.goto('http://localhost:3001/login')

        await page.type('#emailInput', "12345@12345")
        await page.type('#passwordInput', '123@')
        await page.click('.button')

        const errorMsg = await page.$('.error')
        const errorText = await errorMsg.textContent()
        expect(errorText).not.empty

        await page.close()
        await browser.close()
    })
})