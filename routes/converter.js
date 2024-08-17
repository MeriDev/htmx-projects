import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Define the path to the HTML file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '../public/convert.html');

router.get('/', (req, res) => {
  res.sendFile(htmlPath);
});

// convert temp
// °C = (°F - 32) × 5/9
router.post('/convert', (req, res) => {
  setTimeout(() => {
    const fahrenheit_temp = parseFloat(req.body.fahrenheit);

    if (isNaN(fahrenheit_temp)) {
      return res.status(400).send('Invalid temperature value');
    }

    const celsius_temp = (fahrenheit_temp - 32) * (5 / 9);
    res.send(`
      <p>
    ${fahrenheit_temp}°F is equal to ${celsius_temp.toFixed(2)}°C </p>
      `);
  }, 2000);
});

export const converter = router;
