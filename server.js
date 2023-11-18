const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/test', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://m.fusionbrain.ai');
  await page.waitForNavigation();

  await page.type('#username', 'droiders@outlook.com');
  await page.type('#password', 'Simou2007');
  await page.click('#kc-login');
  await page.waitForNavigation();

  const screenshot = await page.screenshot({ type: 'png' });
  res.set('Content-Type', 'image/png');
  res.send(screenshot);

  await browser.close();
});

app.get('/screen', async (req, res) => {
  const { url } = req.query;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  const screenshot = await page.screenshot({ type: 'png' });
  res.set('Content-Type', 'image/png');
  res.send(screenshot);

  await browser.close();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
