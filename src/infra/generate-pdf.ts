import puppeteer from 'puppeteer'

export async function createPDF({ content }: { content: any}): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: 'shell', args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.setContent(content)
    const pdfBuffer = await page.pdf({ format: 'A4' })
    await browser.close()
    return pdfBuffer
}