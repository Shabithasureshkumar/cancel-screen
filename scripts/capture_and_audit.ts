import puppeteer, { Browser, Page } from 'puppeteer-core';
import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8599;
const DIST_DIR = path.join(__dirname, '..', 'dist');
const OUT_DIR = path.join(__dirname, '..', 'screenshots');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Simple static file server
const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const reqUrl = req.url ?? '/';
  const reqPath = reqUrl.split('?')[0];
  let filePath = path.join(DIST_DIR, reqPath === '/' ? 'index.html' : reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const viewports: number[] = [
  320, 360, 375, 390, 393, 412, 430, 480, 
  600, 768, 820, 900, 1024, 1280, 1366, 
  1440, 1536, 1600, 1920
];

interface OverflowResult {
  docScrollWidth: number;
  hasHorizontalScroll: boolean;
}

interface MemberSelectionResult {
  selected: string;
  activeName?: string | null;
  activeImg?: string | null;
}

server.listen(PORT, async () => {
  console.log(`Self-hosted server running on port ${PORT}`);

  try {
    console.log('Launching Chrome with puppeteer-core...');
    const browser: Browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
    });

    const page: Page = await browser.newPage();
    
    // Track console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err: Error) => {
      consoleErrors.push(err.toString());
    });

    console.log(`Navigating to http://127.0.0.1:${PORT}/ ...`);
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0' });

    // ==========================================
    // 1. SCREEN 1 VIEWPORT OVERFLOW AUDIT & CAPTURES
    // ==========================================
    console.log('\n========================================');
    console.log('AUDIT: SCREEN 1 (Cancel Appointment)');
    console.log('========================================');
    
    for (const w of viewports) {
      await page.setViewport({
        width: w,
        height: 900,
        deviceScaleFactor: 1,
        isMobile: w < 1024,
        hasTouch: w < 1024,
      });
      await new Promise<void>((r) => setTimeout(r, 50));

      const overflow: OverflowResult = await page.evaluate((targetWidth: number) => {
        const el = document.documentElement;
        return {
          docScrollWidth: el.scrollWidth,
          hasHorizontalScroll: el.scrollWidth > targetWidth + 1,
        };
      }, w);

      console.log(`[Screen 1 | ${w}px] scrollWidth: ${overflow.docScrollWidth}px | Overflow: ${overflow.hasHorizontalScroll ? 'FAIL ❌' : 'PASS ✅'}`);
    }

    // Capture Screen 1 Screenshots
    const screen1Captures: [string, number, number][] = [
      ['screen1_desktop_1440', 1440, 900],
      ['screen1_tablet_768', 768, 1024],
      ['screen1_mobile_375', 375, 812],
      ['screen1_mobile_320', 320, 640]
    ];
    for (const [name, w, h] of screen1Captures) {
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: w < 1024 });
      await new Promise<void>((r) => setTimeout(r, 150));
      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
      console.log(`Saved screenshot: ${name}.png (${w}x${h})`);
    }

    // Test Family Member Selection on Screen 1
    console.log('\n--- TESTING FAMILY MEMBER SELECTION & AVATARS ---');
    const memberResults: MemberSelectionResult[] = await page.evaluate(async () => {
      const results: MemberSelectionResult[] = [];
      const buttons = Array.from(document.querySelectorAll('button'));
      
      // Select Michael Johnson
      const michaelBtn = buttons.find(b => b.textContent?.includes('Michael Johnson'));
      if (michaelBtn) {
        michaelBtn.click();
        await new Promise<void>(r => setTimeout(r, 100));
        const activeName = document.querySelector('h4.font-bold')?.textContent;
        const activeImg = document.querySelector('img.ring-4')?.getAttribute('src');
        results.push({ selected: 'Michael', activeName, activeImg });
      }

      // Select Linda Johnson
      const lindaBtn = buttons.find(b => b.textContent?.includes('Linda Johnson'));
      if (lindaBtn) {
        lindaBtn.click();
        await new Promise<void>(r => setTimeout(r, 100));
        const activeName = document.querySelector('h4.font-bold')?.textContent;
        const activeImg = document.querySelector('img.ring-4')?.getAttribute('src');
        results.push({ selected: 'Linda', activeName, activeImg });
      }

      // Select Sarah Johnson back
      const sarahBtn = buttons.find(b => b.textContent?.includes('Sarah Johnson'));
      if (sarahBtn) {
        sarahBtn.click();
        await new Promise<void>(r => setTimeout(r, 100));
        const activeName = document.querySelector('h4.font-bold')?.textContent;
        const activeImg = document.querySelector('img.ring-4')?.getAttribute('src');
        results.push({ selected: 'Sarah', activeName, activeImg });
      }

      return results;
    });
    console.log('Family Member Selection Results:', JSON.stringify(memberResults, null, 2));

    // Test Selection and Notes on Screen 1 before transition
    console.log('\n--- SETTING DATA ON SCREEN 1 ---');
    await page.click('input[value="personal_emergency"]');
    await page.type('textarea', 'Family emergency requires rescheduling this slot.');
    console.log('Selected "personal_emergency" and typed notes.');

    // ==========================================
    // 2. TRANSITION TO SCREEN 2
    // ==========================================
    console.log('\n--- TRANSITIONING: SCREEN 1 -> SCREEN 2 ---');
    const transitionClick: boolean = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent?.includes('Confirm Cancellation'));
      if (!btn) return false;
      btn.click();
      return true;
    });
    console.log(`Clicked Confirm Cancellation: ${transitionClick}`);
    await new Promise<void>((r) => setTimeout(r, 500));

    // Verify Screen 2 is active
    const s2H3s: (string | null)[] = await page.evaluate(() => Array.from(document.querySelectorAll('h3')).map(h => h.textContent));
    console.log(`Screen 2 Active H3s:`, s2H3s);

    const s2Radio: string | undefined = await page.evaluate(() => (document.querySelector('input[name="cancellationReason"]:checked') as HTMLInputElement | null)?.value);
    const s2Notes: string | undefined = await page.evaluate(() => (document.querySelector('textarea') as HTMLTextAreaElement | null)?.value);
    console.log(`Screen 2 Preserved Radio: ${s2Radio}`);
    console.log(`Screen 2 Preserved Notes: "${s2Notes}"`);

    // ==========================================
    // 3. SCREEN 2 VIEWPORT OVERFLOW AUDIT & CAPTURES
    // ==========================================
    console.log('\n========================================');
    console.log('AUDIT: SCREEN 2 (Treatment Continuity)');
    console.log('========================================');

    for (const w of viewports) {
      await page.setViewport({
        width: w,
        height: 900,
        deviceScaleFactor: 1,
        isMobile: w < 1024,
        hasTouch: w < 1024,
      });
      await new Promise<void>((r) => setTimeout(r, 50));

      const overflow: OverflowResult = await page.evaluate((targetWidth: number) => {
        const el = document.documentElement;
        return {
          docScrollWidth: el.scrollWidth,
          hasHorizontalScroll: el.scrollWidth > targetWidth + 1,
        };
      }, w);

      console.log(`[Screen 2 | ${w}px] scrollWidth: ${overflow.docScrollWidth}px | Overflow: ${overflow.hasHorizontalScroll ? 'FAIL ❌' : 'PASS ✅'}`);
    }

    // Capture Screen 2 Screenshots
    const screen2Captures: [string, number, number][] = [
      ['screen2_desktop_1440', 1440, 900],
      ['screen2_tablet_768', 768, 1024],
      ['screen2_mobile_375', 375, 812],
      ['screen2_mobile_320', 320, 640]
    ];
    for (const [name, w, h] of screen2Captures) {
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: w < 1024 });
      await new Promise<void>((r) => setTimeout(r, 150));
      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true });
      console.log(`Saved screenshot: ${name}.png (${w}x${h})`);
    }

    // ==========================================
    // 4. TEST ALL INTERACTION FLOWS
    // ==========================================
    console.log('\n--- TESTING SCREEN 2 ACTIONS ---');
    // Test Keep Current Doctor
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(x => x.textContent?.includes('Keep Current Doctor'));
      if (b) b.click();
    });
    await new Promise<void>((r) => setTimeout(r, 300));
    let toast: string | null = await page.evaluate(() => document.querySelector('.fixed.top-5')?.textContent ?? null);
    console.log(`Keep Current Doctor Toast: "${toast}"`);

    // Test Switch Doctor
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(x => x.textContent === 'Switch Doctor');
      if (b) b.click();
    });
    await new Promise<void>((r) => setTimeout(r, 300));
    toast = await page.evaluate(() => document.querySelector('.fixed.top-5')?.textContent ?? null);
    console.log(`Switch Doctor Toast: "${toast}"`);

    // Test Cancel Appointment action on Screen 2 -> Open Receipt Modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(x => x.textContent?.trim() === 'Cancel Appointment');
      if (b) b.click();
    });
    await new Promise<void>((r) => setTimeout(r, 300));
    const receiptModalTitle: string | null = await page.evaluate(() => document.querySelector('h3.text-xl')?.textContent ?? null);
    console.log(`Cancellation Receipt Modal Title: "${receiptModalTitle}"`);

    // Capture Modal Screenshot
    await page.screenshot({ path: path.join(OUT_DIR, 'cancellation_receipt_modal.png') });
    console.log('Saved cancellation_receipt_modal.png');

    // Close Receipt Modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(x => x.textContent?.includes('Close Receipt'));
      if (b) b.click();
    });
    await new Promise<void>((r) => setTimeout(r, 200));

    // Final Console Error Check
    console.log('\n========================================');
    console.log('CONSOLE & RUNTIME CHECK');
    console.log('========================================');
    if (consoleErrors.length > 0) {
      console.error('Console Errors Detected:', consoleErrors);
    } else {
      console.log('Zero Console Errors / Runtime Warnings Detected! ✅');
    }

    await browser.close();
    server.close();
    console.log('\nProduction Audit Complete!');
    process.exit(0);
  } catch (err: unknown) {
    console.error('Audit failed with error:', err);
    server.close();
    process.exit(1);
  }
});
