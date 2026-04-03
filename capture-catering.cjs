const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set a wide viewport for full desktop view
  await page.setViewport({ width: 1440, height: 900 });
  
  // Navigate to the catering page
  await page.goto('http://localhost:3000/catering', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait for images to load and animations to finish
  await new Promise(r => setTimeout(r, 8000));
  
  // Force all Reveal elements to be visible (they use IntersectionObserver)
  await page.evaluate(() => {
    document.querySelectorAll('[class*="opacity-0"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
  
  await new Promise(r => setTimeout(r, 1000));

  // Generate PDF
  await page.pdf({
    path: 'catering-page.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log('✅ PDF saved: catering-page.pdf');

  // Generate full-page screenshot
  await page.screenshot({
    path: 'catering-page.png',
    fullPage: true,
    type: 'png'
  });
  console.log('✅ Screenshot saved: catering-page.png');

  await browser.close();
})();
