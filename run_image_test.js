import fs from 'fs';
import puppeteer from 'puppeteer';
import { execSync } from 'child_process';

try {
  execSync('npm install puppeteer', { stdio: 'ignore' });
} catch (e) {}

const JSON_PATH = './data/products.json'; // Corrigido para o caminho correto

async function run() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log('--- TESTE DE FOGO: PRIMEIRO PRODUTO ---');

  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    if (p.images?.main?.startsWith('http')) continue;

    try {
      const query = encodeURIComponent(p.name + ' cycling product white background');
      await page.goto(`https://www.google.com/search?q=${query}&tbm=isch`, { waitUntil: 'networkidle2' });

      // Seletor robusto: busca imagens que não sejam base64 e tenham tamanho mínimo
      const imgUrl = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const found = imgs.find(img => 
          img.src.startsWith('http') && 
          !img.src.includes('gstatic.com') && 
          img.width > 120
        );
        return found ? found.src : null;
      });

      if (!imgUrl) {
        if (i === 0) {
          console.log(`FALHA TOTAL: Não encontrou imagem para o primeiro item (${p.name}). Abortando.`);
          await browser.close();
          process.exit(1);
        }
        console.log(`[PULADO] ${p.name}`);
      } else {
        if (!p.images) p.images = {};
        p.images.main = imgUrl;
        console.log(`[ACHOU] ${p.name}`);
        fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
      }
    } catch (err) {
      if (i === 0) {
        console.log('ERRO NO TESTE INICIAL. Abortando.');
        process.exit(1);
      }
    }
    await new Promise(r => setTimeout(r, 2500));

  }
  await browser.close();
  console.log('Processo finalizado.');
}

run();
