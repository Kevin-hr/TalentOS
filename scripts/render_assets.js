import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, '../docs/assets');

const FILES = [
  { name: 'cover', width: 2000, height: 400 },
  { name: 'cover_promo', width: 2000, height: 400 },
  { name: 'cover_mobile_330x600', width: 330, height: 600 },
  { name: 'cover_social_1200x660', width: 1200, height: 660 },
  { name: 'logo_square_512x512', width: 512, height: 512 },
];

(async () => {
  console.log('🚀 启动渲染引擎 (Puppeteer)...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();

  for (const file of FILES) {
    const svgPath = path.join(ASSETS_DIR, `${file.name}.svg`);
    const pngPath = path.join(ASSETS_DIR, `${file.name}.png`);
    const jpgPath = path.join(ASSETS_DIR, `${file.name}.jpg`);

    if (!fs.existsSync(svgPath)) {
      console.warn(`⚠️  未找到源文件: ${svgPath}`);
      continue;
    }

    // Windows file URL compatibility
    const fileUrl = `file://${svgPath.replace(/\\/g, '/')}`;
    console.log(`🎨 正在渲染: ${file.name} (${file.width}x${file.height})`);

    await page.setViewport({ width: file.width, height: file.height });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // PNG
    await page.screenshot({ path: pngPath, type: 'png', omitBackground: true });
    console.log(`   ✅ PNG: ${path.basename(pngPath)}`);

    // JPG
    await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 90 });
    console.log(`   ✅ JPG: ${path.basename(jpgPath)}`);
  }

  await browser.close();
  console.log('✨ 所有品牌资产已转换为光栅图像 (PNG/JPG)');
})();
