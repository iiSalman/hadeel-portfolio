// Render print.html to Hadeel-Portfolio.pdf.
// tagged:true + preferCSSPageSize:true make internal TOC anchor links clickable.

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const fileUrl = 'file://' + path.resolve(__dirname, 'print.html');
  const outPath = path.resolve(__dirname, 'Hadeel-Portfolio.pdf');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 120000 });
  // Ensure web fonts are loaded before snapshot
  await page.evaluate(() => document.fonts && document.fonts.ready);

  await page.pdf({
    path: outPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('Wrote', outPath);
})().catch(err => { console.error(err); process.exit(1); });
